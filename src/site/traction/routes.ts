export type Language = 'en' | 'fr';

const frenchPaths: Record<string,string> = {
  '/traction':'/fr/traction', '/traction/how-it-works':'/fr/traction/how-it-works',
  '/traction/partnership':'/fr/traction/partnership', '/os':'/fr/os',
  '/explore':'/fr/explore', '/contact':'/fr/contact', '/privacy':'/fr/confidentialite',
};

export function frenchHref(href:string) {
  const match = href.match(/^([^?#]*)(.*)$/);
  return match && frenchPaths[match[1]] ? frenchPaths[match[1]] + match[2] : href;
}

export function englishHref(href:string) {
  return Object.entries(frenchPaths).find(([,value])=>value===href)?.[0];
}

export const panels = {
  traction:'/traction', 'how-it-works':'/traction/how-it-works',
  partnership:'/traction/partnership', 'hd-os-example':'/os',
} as const;
export type Panel = keyof typeof panels;
