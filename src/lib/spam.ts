const MIN_FILL_MS = 3000;

/**
 * Cheap bot filter: honeypot must be empty and the form must have been open
 * for a few seconds. Swap in Cloudflare Turnstile here if spam gets through.
 */
export function looksLikeSpam({ website, startedAt }: { website?: string; startedAt: number }) {
  if (website) return true;
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) return true;
  return false;
}
