---
title: "Charts & Data Visualization"
description: "Add interactive charts to your dashboard using Recharts."
---

# Charts & Data Visualization

## Introduction

Charts turn raw numbers into insights. Using Recharts, you'll add interactive line charts, bar charts, and metric cards to your dashboard.

## Setup

```bash
npm install recharts
```

## Server Data Fetching

Fetch analytics data in a Server Component and pass it to chart components:

```tsx
// app/dashboard/page.tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { MetricCards } from '@/components/dashboard/metric-cards'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { CategoryChart } from '@/components/dashboard/category-chart'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')

  // Fetch data in parallel
  const [totalUsers, totalOrders, revenue, monthlyRevenue] = await Promise.all([
    db.user.count(),
    db.order.count(),
    db.order.aggregate({ _sum: { amount: true } }),
    db.$queryRaw`SELECT DATE(createdAt) as date, SUM(amount) as revenue
                 FROM Order GROUP BY DATE(createdAt) ORDER BY date DESC LIMIT 30`,
  ])

  return (
    <div className="space-y-6">
      <MetricCards
        users={totalUsers}
        orders={totalOrders}
        revenue={revenue._sum.amount ?? 0}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={monthlyRevenue} />
        <CategoryChart />
      </div>
    </div>
  )
}
```

## Metric Cards

```tsx
// components/dashboard/metric-cards.tsx
interface MetricCardsProps {
  users: number
  orders: number
  revenue: number
}

export function MetricCards({ users, orders, revenue }: MetricCardsProps) {
  const metrics = [
    { label: 'Total Users', value: users.toLocaleString(), change: '+12%' },
    { label: 'Total Orders', value: orders.toLocaleString(), change: '+8%' },
    { label: 'Revenue', value: `$${revenue.toLocaleString()}`, change: '+15%' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map(metric => (
        <div key={metric.label} className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">{metric.label}</p>
          <p className="text-2xl font-bold mt-1">{metric.value}</p>
          <p className="text-green-600 text-sm mt-1">{metric.change}</p>
        </div>
      ))}
    </div>
  )
}
```

## Line Chart

```tsx
// components/dashboard/revenue-chart.tsx
'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface RevenueChartProps {
  data: Array<{ date: string; revenue: number }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-semibold mb-4">Revenue Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
```

## Bar Chart

```tsx
// components/dashboard/category-chart.tsx
'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { category: 'Electronics', count: 45 },
  { category: 'Clothing', count: 32 },
  { category: 'Books', count: 28 },
  { category: 'Home', count: 20 },
]

export function CategoryChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-semibold mb-4">Orders by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
```

## Loading State

```tsx
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-gray-200 rounded-lg h-24" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-200 rounded-lg h-80" />
        <div className="bg-gray-200 rounded-lg h-80" />
      </div>
    </div>
  )
}
```

## Best Practices

- Fetch chart data on the server — never expose database queries to the client
- Use `ResponsiveContainer` for responsive charts
- Add skeleton loading states for dashboard pages
- Show meaningful empty states when there's no data yet

## Common Mistakes

- **Fetching data on the client** — Server Components can access the database directly
- **Not handling empty data** — Charts should show a message when there's no data
- **Making charts too complex** — Start simple and add interactivity as needed
- **Forgetting loading states** — Dashboard pages with data fetching need `loading.tsx`

## Summary

Recharts makes it easy to add interactive charts to your dashboard. Fetch data on the server, pass it to Client Component charts, and always provide loading states and empty state handling.
