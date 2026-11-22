import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {startHref} from '@/data/traction-offer';
import messages from './messages.json';
import {frenchHref, type Language, type Panel} from './routes';

const template = readFileSync(join(process.cwd(),'src/site/content/traction.html'),'utf8');
const escape = (value:string) => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const copy: Record<string,Record<Language,string>> = messages;

// Both versions render from the same navigation, forms, examples, chapters and destinations.
export function tractionHtml(panel:Panel, lang:Language, start = startHref()) {
  const fr = lang==='fr';
  const tokens: Record<string,string> = {
    sourceLanguage:fr?' <span class="link-language">(en anglais)</span>':'',
    panel,lang,start:escape(start),startLink:escape(start+(fr?(start.includes('?')?'&':'?')+'lang=fr':'')),
    languageInput:fr?'<input type="hidden" name="lang" value="fr">':'',
    heroFilm:'/traction/growth-film'+(fr?'.fr':'')+'.mp4', heroPoster:fr?'/traction/growth-film.fr.jpg':'/assets/traction.jpg',
    heroTrack:'/assets/traction-film.'+lang+'.vtt',tourFilm:'/traction/tour/film'+(fr?'.fr':'')+'.mp4',
    tourPoster:fr?'/traction/tour/film.fr.jpg':'/assets/traction-tour.jpg',tourTrack:'/assets/traction-tour.'+lang+'.vtt',
  };
  return template.replace(/\{\{([^}]+)\}\}/g,(_,token:string)=>{
    const [type,...parts]=token.split(':');
    const key=parts.join(':');
    if(type==='copy' && copy[key]?.[lang]) return escape(copy[key][lang]);
    if(type==='tab') return key===panel?' aria-current="page"':'';
    if(type==='visibility') return key===panel?'':' hidden';
    if(type==='chapter') {
      const path='/traction/how-it-works?chapter='+key+'#outreach';
      return panel==='how-it-works'?'href="#outreach" data-watch-chapter="'+key+'"':'href="'+(fr?frenchHref(path):path)+'"';
    }
    if(type==='link') {
      if(key==='/traction/partnership#why' && panel==='partnership') return '#why';
      if(key==='/traction#trial' && panel==='traction') return '#trial';
      return fr?frenchHref(key):key;
    }
    if(Object.hasOwn(tokens,token)) return tokens[token];
    throw new Error('Missing Traction template value: '+lang+' '+token);
  });
}
