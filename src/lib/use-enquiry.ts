'use client';
import { enquiryCopy, type EnquiryLanguage } from '@/data/enquiry-copy';
import { useRef, useState, type FormEvent, type FocusEvent } from 'react';
import { enquiryChoices } from '@/data/situations';
import { articleSession, trackArticle } from './article-tracking';

import { campaignAttribution } from './campaign';
import { enquiryHandoff } from './enquiry-handoff';
import { trackEvent } from './analytics';

export function useEnquiry(language: EnquiryLanguage = 'en') {
  const t = enquiryCopy[language];
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'preview' | 'error'>('idle');
  const [error, setError] = useState('');
  const started = useRef(false);
  const onFocus = (event: FocusEvent<HTMLFormElement>) => {
    if (started.current) return;
    started.current = true;
    const form = new FormData(event.currentTarget);
    const article = String(form.get('article') || '');
    const situation = enquiryChoices.find((choice) => choice.value === form.get('situation'))?.value;
    trackEvent('enquiry_started', { article: article || undefined, situation, ...enquiryHandoff() });
    if (article) trackArticle(article, 'enquiry_started');
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    const element = event.currentTarget;
    const form = new FormData(element);
    const article = String(form.get('article') || '') || undefined;
    setStatus('sending'); setError('');
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: String(form.get('name') || ''), email: String(form.get('email') || ''),
          company: String(form.get('company') || '') || undefined,
          workflow_example: String(form.get('workflow_example') || '') || undefined,
          situation: enquiryChoices.find((choice) => choice.value === form.get('situation'))?.label,
          traction_board: String(form.get('traction_board') || '') || undefined,
          message: String(form.get('message') || ''), website: String(form.get('website') || '') || undefined, article, session: articleSession(), campaign: campaignAttribution(), handoff: enquiryHandoff(),
        }),
      });
      const body = await response.json();
      if (!response.ok) {
        const reason = response.status === 429 ? t.rate : response.status === 400 || response.status === 413 ? t.invalid : t.unavailable;
        setError(language === 'en' && typeof body.error === 'string' ? body.error : reason);
        setStatus('error');
        return;
      }
      setStatus(body.preview ? 'preview' : 'sent');
      element.reset();
    } catch {
      setStatus('error'); setError(t.retry);
    }
  };
  return { status, error, onFocus, onSubmit };
}
