import {readFileSync} from 'node:fs';
import {describe,expect,it} from 'vitest';
import {tractionMetadata} from './TractionPage';
import {tractionHtml} from './render';
import {frenchHref,panels,type Panel} from './routes';

// Actions include their fragment, chapter, query and form destination. A text-only
// translation could otherwise lose a complete customer journey and still compile.
const attribute=(tag:string,key:string)=>tag.match(new RegExp(' '+key+'="([^"]*)"'))?.[1];
const tags=(html:string,name:string)=>[...html.matchAll(new RegExp('<'+name+'\\b[^>]*>','g'))].map(m=>m[0]);
const start='https://traction.hyperdrift.io/start';

describe('French Traction journey',()=>{
  for(const panel of Object.keys(panels) as Panel[]) {
    it('shares a Traction-branded card when '+panel+' is pasted into a message',()=>{
      for (const lang of ['en','fr'] as const) {
        const metadata=tractionMetadata(panel,lang);
        const [image]=metadata.openGraph.images;
        expect(image.url).toContain('/brand/traction/og-dark.jpg');
        expect(image.alt).toContain(lang==='fr'?'voile':'sail');
        expect(metadata.twitter.images).toEqual([image]);
      }
    });
    it('keeps every link, control and example on '+panel,()=>{
      const en=tractionHtml(panel,'en',start),fr=tractionHtml(panel,'fr',start);
      const translatedDestination=(href:string) => {
        if(href===start) return start+'?lang=fr';
        if(href.endsWith('.mp4')) return href.replace('.mp4','.fr.mp4');
        return frenchHref(href);
      };
      expect(tags(fr,'a').map(t=>attribute(t,'href'))).toEqual(tags(en,'a').map(t=>translatedDestination(attribute(t,'href')!)));
      for(const role of ['details','button','form','iframe','video','track','article']) {
        expect(tags(fr,role).map(t=>[attribute(t,'id'),attribute(t,'type'),attribute(t,'data-chapter'),attribute(t,'action')])).toEqual(
          tags(en,role).map(t=>[attribute(t,'id'),attribute(t,'type'),attribute(t,'data-chapter'),attribute(t,'action')]));
      }
      expect(tags(fr,'form')).toHaveLength(2);
      expect(fr.match(/name="lang" value="fr"/g)).toHaveLength(2);
      expect(fr).toContain('data-src="/fr/explore?panel=1');
      expect(fr).toContain('/fr/contact?situation=partnership');
      expect(fr).toContain('/fr/contact?situation=subscription');
      expect(fr).toContain('data-initial-panel="'+panel+'"');
      expect(fr).not.toContain('{{');
      expect(fr).not.toMatch(/Orchestra|76 seconds|Vidéo en anglais/i);
    });
  }
  it('requires translated visible text and accessible labels for additions to the shared template',()=>{
    const template=readFileSync('src/site/content/traction.html','utf8').replace(/\{\{[^}]+\}\}/g,'');
    for(const match of template.matchAll(/>([^<>]+)</g)) expect(match[1].trim()).toMatch(/^[→↗\s]*$/u);
    for(const match of template.matchAll(/(?:aria-label|title|placeholder|alt|label)="([^"]*)"/g)) expect(match[1]).toBe('');
  });
});

it('renders the French HD OS event and domain controls in the visitor’s language',async()=>{
  const {renderToStaticMarkup}=await import('react-dom/server');
  const {createElement}=await import('react');
  const {OperatingSystem}=await import('./explore/Example');
  const en=renderToStaticMarkup(createElement(OperatingSystem,{lang:'en'}));
  const fr=renderToStaticMarkup(createElement(OperatingSystem,{lang:'fr'}));
  const controls=(html:string)=>[...html.matchAll(/<button\b[^>]*>([^<]+)<\/button>/g)].map(m=>m[1]);
  expect(controls(fr)).toHaveLength(controls(en).length);
  expect(controls(fr).slice(0,5)).toEqual([
    'Un prospect soulève une objection','Un concurrent modifie ses tarifs','Le comportement des clients change',
    'Une amélioration est mise en service','L’équipe repère un public plus pertinent',
  ]);
  expect(controls(fr)).toContain('Suivi des prospects');
});
