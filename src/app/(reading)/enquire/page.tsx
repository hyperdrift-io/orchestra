import type {Route} from 'next';
import {permanentRedirect} from 'next/navigation';
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const params=new URLSearchParams();for(const [key,value] of Object.entries(await searchParams)){for(const item of Array.isArray(value)?value:value===undefined?[]:[value])params.append(key,item)}permanentRedirect(('/contact'+(params.size?'?'+params.toString():'')) as Route)}
