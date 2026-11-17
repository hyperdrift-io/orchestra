import assert from 'node:assert/strict';
import {readFileSync, existsSync, mkdtempSync, writeFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve, dirname, join} from 'node:path';
import {createHash,webcrypto} from 'node:crypto';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
const require=createRequire(import.meta.url);
const root=resolve('.');
function loader({env={},stubs={},fetcher}={}){
 const cache=new Map();
 const load=(file)=>{
  file=resolve(file);if(cache.has(file))return cache.get(file).exports;
  const module={exports:{}};cache.set(file,module);
  const localRequire=(id)=>{
   if(id in stubs)return stubs[id];
   if(id==='next/cache')return {unstable_noStore(){}};
   if(id.startsWith('@/')||id.startsWith('.')){
    const stem=id.startsWith('@/')?join(root,'src',id.slice(2)):resolve(dirname(file),id);
    const actual=[stem,stem+'.ts',stem+'.tsx',stem+'.json'].find(p=>existsSync(p));
    if(actual?.endsWith('.json'))return JSON.parse(readFileSync(actual,'utf8'));
    if(actual?.endsWith('.ts')||actual?.endsWith('.tsx'))return load(actual);
    return require(actual||stem);
   }
   return require(id);
  };
  const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,esModuleInterop:true,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  vm.runInNewContext(code,{module,exports:module.exports,require:localRequire,process:{env,cwd:()=>root},console,URL,URLSearchParams,Response,Request,Headers,AbortSignal,crypto:webcrypto,fetch:fetcher||(()=>{throw Error('Unexpected network')}),Buffer,setTimeout,clearTimeout});
  return module.exports;
 };
 return load;
}
const events=[];
function enquiry(env={},failRelay=false){
 events.length=0;
 const load=loader({env:{NODE_ENV:'production',CONTACT_RELAY_URL:'http://127.0.0.1:3000/api/contact',CONTACT_RELAY_KEY:'fixture-key',...env},stubs:{
  '@/lib/enquiry-storage':{async saveEnquiry(id,data,delivery){events.push({kind:'save',id,data,delivery})},async recordArticleEvent(e){events.push({kind:'event',...e})}},
  '@/lib/analytics-server':{async trackEnquiry(){}},
 },fetcher:async(url,options)=>{events.push({kind:'relay',url,options});return new Response('fixture',{status:failRelay?500:200})}});
 return load('src/app/api/enquiry/route.ts').POST;
}
const data={name:'Fixture Founder',email:'founder@fixture-company.org',message:'A fixture enquiry for migration verification.',campaign:{utm_source:'linkedin',utm_campaign:'traction'},handoff:{source_site:'hyperdrift',source_path:'/blog/hyperdrift-turns-one'}};
const request=(origin='https://hyperdrift.io',body=data)=>new Request('http://localhost/api/enquiry',{method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)});
for(const origin of ['https://hyperdrift.io','https://orchestra.hyperdrift.io','https://ai.hyperdrift.io']){
 const post=enquiry();const response=await post(request(origin));assert.equal(response.status,200);const receipt=await response.json();assert.ok(receipt.id);assert.deepEqual(events.map(e=>e.kind),['save','relay','save']);assert.equal(events[0].delivery,'pending');assert.equal(events[2].delivery,'sent');assert.equal(events[0].id,receipt.id);assert.equal(events[1].url,'http://127.0.0.1:3000/api/contact');assert.equal(events[1].options.headers['x-contact-relay-key'],'fixture-key');assert.match(events[1].options.body,/utm_campaign: traction/);assert.match(events[1].options.body,/source_path|hyperdrift.io\\?\/blog/);
}
let post=enquiry();assert.equal((await post(request('https://unrelated.example'))).status,403);assert.equal(events.length,0);
post=enquiry();assert.equal((await post(request(undefined,{...data,article:'market-signals-to-delivered-work'}))).status,400);assert.equal(events.length,0);
post=enquiry();assert.equal((await post(request(undefined,{...data,website:'spam'}))).status,200);assert.equal(events.length,0);
post=enquiry({},true);assert.equal((await post(request())).status,502);assert.equal(events.at(-1).delivery,'failed');
post=enquiry({MIGRATION_PREVIEW:'true'});assert.equal((await post(request())).status,503);assert.equal(events.length,0);
post=enquiry({CONTACT_RELAY_URL:'http://127.0.0.1:3000/api/enquiry'});assert.equal((await post(request())).status,502);assert.ok(!events.some(e=>e.kind==='relay'));
post=enquiry();assert.equal((await post(request(undefined,{...data,message:'x'.repeat(17000)}))).status,413);assert.equal(events.length,0);
post=enquiry();assert.equal((await post(request(undefined,{...data,situation:'Continued use of Traction',message:''}))).status,200);
post=enquiry();assert.equal((await post(request(undefined,{...data,workflow_example:'market'}))).status,200);assert.match(events.find(e=>e.kind==='relay').options.body,/Workflow example: market/);
const handoff=loader()('src/lib/enquiry-handoff.ts');assert.equal(handoff.parseEnquiryHandoff(new URLSearchParams('source_path=/blog/hyperdrift-turns-one&source_project=traction')).source_project,'traction');
const load=loader();const catalogue=load('src/lib/article-catalogue.ts');assert.equal(catalogue.publishedArticles().length,16);assert.equal(catalogue.articleBySlug('market-signals-to-delivered-work'),undefined);
const clean=load('src/lib/analytics-clean.ts');const token='a'.repeat(64);const properties={$current_url:`https://hyperdrift.io/traction/invitation/${token}?email=private@example.com`,nested:{url:`https://hyperdrift.io/traction/invitation/${token}`},$pathname:`/traction/invitation/${token}`};clean.cleanProperties(properties);assert.ok(!JSON.stringify(properties).includes(token));assert.ok(!JSON.stringify(properties).includes('private@example.com'));
const dir=mkdtempSync(join(tmpdir(),'hd-invitation-test-'));try{
 const file=join(dir,'invitations.json');writeFileSync(file,JSON.stringify({[createHash('sha256').update(token).digest('hex')]:{firstName:'Fixture',product:'Example app',welcome:'Welcome to this fixture.',url:'https://example.com',ref:'c-1234abcd'}}));
 const invitations=loader({env:{TRACTION_INVITATIONS_FILE:file}})('src/lib/traction-invitations.ts');assert.equal((await invitations.tractionInvitation(token)).product,'Example app');assert.equal(await invitations.tractionInvitation('bad'),undefined);assert.equal(await invitations.tractionInvitation('b'.repeat(64)),undefined);
}finally{rmSync(dir,{recursive:true,force:true})}
console.log('[test:migration] origins, save-before-relay receipt, campaign context, failed relay, recursion prevention, paused preview, bounds, quote schema, 16 published articles, private-token redaction and invitation lookup passed');
