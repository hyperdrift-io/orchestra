"use client";
import {useEffect} from 'react';
export function EmbedResize({panel}:{panel:boolean}){useEffect(()=>{if(!panel)return;document.documentElement.dataset.panel='true';const main=document.querySelector('main');if(!main)return;const report=()=>parent.postMessage({type:'hd-os-height',height:Math.ceil(main.getBoundingClientRect().height)},location.origin);const observer=new ResizeObserver(report);observer.observe(main);report();return()=>observer.disconnect()},[panel]);return null}
