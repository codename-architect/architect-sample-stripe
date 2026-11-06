# Tessora PoC — Sample Stripe service module

A standalone repository representing a **Stripe integration component** in the
Tessora multi-repo architecture view. The repo-component adapter detects it
(`stripe` dependency → `serviceType: "stripe"`, `role: "saas"`) and renders it
as its own microservice-style node on the macro component graph, with a
`depends_on` edge from the compute Lambda component.

## Why it's a separate repo

Per the platform vision (docs 07/13/15), SaaS integrations are **components**,
not code baked into the backend. Modeling Stripe as its own repo proves the
repo-component adapter and the drill-down: click the Stripe component → see its
repo-wide diagram + file tree → run Domino/Taste on it.

## Keys

Keyless by design. Live activation needs `STRIPE_API_KEY` (restricted) supplied
by the operator — brokered to a vault as a `secret_ref`, never stored raw.
See README. Pending user-provided keys.
