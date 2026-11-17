import {pageMetadata} from '@/lib/site-metadata';
import {allArticles} from '@/site/catalogue';
import {Blog} from '@/site/Blog';
import '@/../public/assets/blog.css';
export const revalidate=60;
export const metadata=pageMetadata('Blog','Field notes on building, operating and growing apps with AI.','/articles');
export default function Page(){return <Blog articles={allArticles()}/>}
