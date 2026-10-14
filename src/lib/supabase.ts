import { createClient } from '@supabase/supabase-js';

function sanitizeSupabaseUrl(rawUrl: string | undefined): string {
  if (!rawUrl || typeof rawUrl !== 'string') return 'https://placeholder.supabase.co';
  let trimmed = rawUrl.trim();
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') {
    return 'https://placeholder.supabase.co';
  }
  // Auto-prepend https:// if user pasted without protocol (e.g. abcxyz.supabase.co)
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    trimmed = `https://${trimmed}`;
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.origin;
    }
  } catch {
    // Malformed URL fallback
  }
  return 'https://placeholder.supabase.co';
}

function sanitizeAnonKey(rawKey: string | undefined): string {
  if (!rawKey || typeof rawKey !== 'string') return 'placeholder-anon-key';
  const trimmed = rawKey.trim();
  return trimmed && trimmed !== 'undefined' && trimmed !== 'null' ? trimmed : 'placeholder-anon-key';
}

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = sanitizeSupabaseUrl(rawUrl);
const supabaseAnonKey = sanitizeAnonKey(rawKey);

export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawKey &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder')
);

// Safe createClient that never throws on module load even if credentials are malformed
export const supabase = (() => {
  try {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } catch (err) {
    console.warn('Supabase client initialization warning:', err);
    return createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
})();
