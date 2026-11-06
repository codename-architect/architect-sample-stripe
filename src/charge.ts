/**
 * Tessora PoC sample Stripe service module.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  NOTE — PENDING USER-PROVIDED API KEYS (TO BE DONE)
 * This is a keyless scaffold. No real Stripe secret key is used or required.
 * To activate live charging, supply STRIPE_API_KEY (a restricted key) — see
 * README. The Tessora platform brokers that key into a vault as a secret_ref
 * and never stores the raw value.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * The repo-component adapter detects this repo as serviceType "stripe" via the
 * `stripe` dependency. It carries an intentional O(n²) nested loop so the
 * platform's Domino chain + Taste Score light up the same way they do for the
 * compute Lambda.
 */

export type LineItem = { sku: string; amountCents: number };

/**
 * Intentional O(n²) nested loop — Layer-1 rule id `nested_loop`.
 * Do not optimize; the Domino demo depends on this smell.
 * Computes the cross-item fee matrix total (a deliberately naive stand-in).
 */
export function reconcileCharges(items: readonly LineItem[]): number {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      total += items[i]!.amountCents + items[j]!.amountCents;
    }
  }
  return total;
}

export type WebhookEvent = { type: string; id: string };

/** Minimal webhook router stub (no network, no key). */
export function routeWebhook(event: WebhookEvent): { handled: boolean } {
  const handled =
    event.type === "charge.succeeded" || event.type === "charge.failed";
  return { handled };
}

export const FIXTURE: LineItem[] = Array.from({ length: 40 }, (_, i) => ({
  sku: `sku-${i}`,
  amountCents: i * 100,
}));
