import {allArticles} from '@/site/catalogue';
import {Blog} from '@/site/Blog';
import '@/../public/assets/blog.css';
export const revalidate=60;
export const metadata={title:'Blog',description:'Field notes on building, operating and growing apps with AI.',alternates:{canonical:'/articles'}};
export default function Page(){return <Blog articles={allArticles()}/>}
