"use client";
import {archiveOrigin} from './archive';
import {useState} from 'react';
import type {CatalogueEntry} from './catalogue';
export function Blog({articles}:{articles:CatalogueEntry[]}){
 const [query,setQuery]=useState(''),[topic,setTopic]=useState('');
 const tags=Array.from(new Set(articles.flatMap(a=>a.tags))).sort();
 const terms=query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
 const visible=articles.filter(a=>(!topic||a.tags.includes(topic))&&terms.every(term=>`${a.title} ${a.excerpt} ${a.tags.join(' ')}`.toLocaleLowerCase().includes(term)));
 return <main className="blog-page"><section className="blog-heading"><h1>Blog</h1><p>Field notes from our work. <a href={`${archiveOrigin}/blog`}>Explore earlier projects and writing ↗</a></p><form className="blog-filters" role="search" aria-label="Find articles" onSubmit={e=>e.preventDefault()}><label><span className="blog-control-label">Topic</span><select value={topic} onChange={e=>setTopic(e.target.value)}><option value="">All topics</option>{tags.map(t=><option key={t} value={t}>{t}</option>)}</select></label><label><span className="blog-control-label">Search articles</span><input type="search" placeholder="Find an article" value={query} onChange={e=>setQuery(e.target.value)}/></label></form><p aria-live="polite">{visible.length} {visible.length===1?'article':'articles'}</p></section><div className="blog-grid" data-filtered={Boolean(query||topic)}>{visible.map((a,i)=><article className="blog-card" key={a.id}><a href={a.href} className="blog-card-link">{a.image&&<div className="blog-image"><img src={a.image.src} alt={a.image.alt} width="1600" height="900" loading={i<2?'eager':'lazy'}/></div>}<div className="blog-card-copy"><p className="blog-meta">{a.tags[0]||'Hyperdrift'}<span>{a.minutes} min read</span></p><h2>{a.title}</h2><p className="blog-excerpt">{a.excerpt}</p></div></a></article>)}</div>{!visible.length&&<p>No articles match. Try a different topic or search.</p>}</main>
}
