import Image from '@/components/ArticleOg';
export const revalidate=86400;
export async function GET(_request:Request,context:{params:Promise<{slug:string}>}){return Image(context)}
