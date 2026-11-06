# architect-sample-stripe

Tessora PoC sample **Stripe service-module repo**. It exists to prove the
platform's multi-repo component model: a separate repository that the
**repo-component adapter** classifies as a Stripe SaaS integration and wires
onto the dual canvas as its own component — with the core features (Domino
chain, Taste Score, connections) applying to it like any other component.

- Classified as `serviceType: "stripe"` via the `stripe` dependency in
  `package.json`.
- `src/charge.ts` carries an intentional O(n²) `reconcileCharges` nested loop
  so the Domino/Taste pipeline lights up (mirrors `architect-sample-lambda`).

## ⚠️ Pending user-provided API keys (TO BE DONE)

This repo is **keyless**. No real Stripe key is used or committed. To activate
a live Stripe connection through the Tessora Connections Control Plane, supply
a Stripe **restricted** key as `STRIPE_API_KEY` (scopes `charges:write`,
`webhooks:read`). Tessora brokers it into a vault as a `secret_ref` and never
stores the raw value. Until keys are provided, the live integration is
inactive; the component still appears on the canvas and is fully analyzable.

## Dev

```bash
npm install && npm run build && npm test
```
