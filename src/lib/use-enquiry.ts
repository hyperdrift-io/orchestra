'use client';
import { useRef, useState, type FormEvent, type FocusEvent } from 'react';
import { enquiryChoices } from '@/data/situations';
import { articleSession, trackArticle } from './article-tracking';

import { campaignAttribution } from './campaign';
import { trackEvent } from './analytics';

export function useEnquiry() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'preview' | 'error'>('idle');
  const [error, setError] = useState('');
  const started = useRef(false);
  const onFocus = (event: FocusEvent<HTMLFormElement>) => {
    if (started.current) return;
    started.current = true;
    const article = String(new FormData(event.currentTarget).get('article') || '');
    trackEvent('enquiry_started', { article: article || undefined });
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
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: String(form.get('name') || ''), email: String(form.get('email') || ''),
          company: String(form.get('company') || '') || undefined,
          situation: enquiryChoices.find((choice) => choice.value === form.get('situation'))?.label,
          message: String(form.get('message') || ''), article, session: articleSession(), campaign: campaignAttribution(),
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Please try sending your enquiry again.');
      setStatus(body.preview ? 'preview' : 'sent');
      element.reset();
    } catch (error) {
      setStatus('error'); setError(error instanceof Error ? error.message : 'Please try again.');
    }
  };
  return { status, error, onFocus, onSubmit };
}
