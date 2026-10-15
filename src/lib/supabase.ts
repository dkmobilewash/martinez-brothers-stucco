import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client for lead capture.
 *
 * TODO (owner): create a Supabase project, run supabase/migrations/*_create_leads.sql,
 * then set these in Vercel → Project → Settings → Environment Variables:
 *   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
 *   VITE_SUPABASE_ANON_KEY=<anon public key>
 * The anon key is safe to expose; RLS only allows INSERT on `leads`.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null;

/** TODO (owner): set VITE_ZAPIER_WEBHOOK_URL to a Zapier "Catch Hook" URL. */
export const ZAPIER_WEBHOOK_URL = (import.meta.env.VITE_ZAPIER_WEBHOOK_URL as string | undefined) ?? '';

export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

/**
 * Saves a lead to Supabase and forwards it to Zapier. Succeeds if at least
 * one destination accepted it; throws otherwise.
 */
export async function submitLead(lead: LeadInput, source: string): Promise<void> {
  const results: boolean[] = [];

  if (supabase) {
    const { error } = await supabase.from('leads').insert({ ...lead });
    if (error) console.error('Supabase lead insert failed', error);
    results.push(!error);
  }

  if (ZAPIER_WEBHOOK_URL) {
    try {
      // text/plain + no-cors avoids a CORS preflight that Zapier hooks don't answer.
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify({ ...lead, source, submitted_at: new Date().toISOString() }),
      });
      results.push(true);
    } catch (err) {
      console.error('Zapier webhook failed', err);
      results.push(false);
    }
  }

  if (!results.includes(true)) {
    throw new Error(
      results.length === 0 ? 'Lead capture is not configured (missing Supabase/Zapier env vars).' : 'Lead submission failed.',
    );
  }
}
