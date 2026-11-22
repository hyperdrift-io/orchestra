import '@/app/fonts.css';
import '@/site/styles/style.css';
import '@/site/styles/pages.css';
import '@/site/styles/migration.css';
import './pilot.css';
export {metadata} from '@/site/metadata';

export default function FrenchLayout({children}: {children: React.ReactNode}) {
  return <html lang="fr"><body>
    <header className="preview-header">
      <a className="brand preview-brand" href="/fr/traction"><img src="/assets/hyperdrift-logo.svg" alt="" width="40" height="40"/>Hyperdrift</a>
      <nav aria-label="Navigation principale"><a href="/fr/traction">Traction</a><a href="/traction" lang="en" hrefLang="en">English</a></nav>
    </header>
    {children}
    <footer className="site-footer"><nav aria-label="Pied de page"><a href="/fr/traction">Traction</a><a href="/fr/confidentialite">Confidentialité</a></nav>
      <p>© {new Date().getFullYear()} Hyperdrift Limited · Société immatriculée en Angleterre et au pays de Galles sous le numéro 16638188.</p>
    </footer>
  </body></html>;
}
