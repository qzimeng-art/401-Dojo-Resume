# Demo Mode

## Objective

Make the product demo-safe even if presenters are nervous.

## Seed guarantees

The final database must contain:
- at least one interview
- one offer
- one rejection
- one stale app
- one overdue follow-up
- one tailored resume
- one application with rich timeline

## Demo-safe controls

Avoid critical demo actions that:
- require external network APIs
- require OAuth
- require file chooser
- require browser permissions

## Optional demo reset

If trivial, add hidden/admin-only reset mechanism:
- server seed endpoint available only in development
or
- documented command

Do not expose dangerous public reset button in deployed demo.

## Fallback states

If live mutation fails during demo:
- seeded application detail remains useful
- Match Studio works deterministically
- dashboard still contains meaningful data

## Demo account

No login.

If auth somehow already exists:
- provide one-click demo user
- never require signup during demo

## Demo URL

Use production Vercel URL.

Keep browser tab pre-opened.

## Prepared browser tabs

1. Dashboard
2. Shopify application detail
3. Shopify tailored resume
4. Mobile viewport optionally

This prevents wasted navigation time if needed.
