---
title: "Deployment"
description: "Deploy your e-commerce store with database and payments."
---

# Deployment

## Introduction

Deploying an e-commerce store requires a production database, secure environment variables, and careful testing of the checkout flow.

## Database

```bash
# Push schema to production database
npx prisma migrate deploy
```

## Environment Variables

```
DATABASE_URL=your_production_db_url
STRIPE_SECRET_KEY=sk_live_... (if using Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## Stripe Integration (Optional)

To add real payments:

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

Create a Payment Intent API route:

```ts
// app/api/create-payment-intent/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const { amount } = await request.json()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: 'usd',
  })

  return NextResponse.json({ clientSecret: paymentIntent.client_secret })
}
```

## Deployment Checklist

- [ ] Database migrations have run on production
- [ ] Environment variables are configured
- [ ] Cart persists correctly across sessions
- [ ] Checkout flow works end-to-end
- [ ] Order confirmation page displays correctly
- [ ] Payment processing works (if integrated)
- [ ] Email notifications are configured (optional)

## Summary

Deploying an e-commerce store requires database setup, environment variables for payments, and thorough testing of the checkout flow. Always test a complete purchase flow after deployment.
