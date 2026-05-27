# AutoStock — Automobile Spare Parts Inventory Dashboard

A premium, mobile-first inventory management app built with React + Vite + Tailwind CSS + Supabase.

---

## Features

- **Live inventory** — Real-time updates via Supabase Realtime subscriptions
- **Green/Gray cards** — Green for in-stock (remaining > 0), gray for out-of-stock
- **Dual search** — Search by product name OR part number simultaneously
- **Filters** — All / In Stock / Out of Stock
- **Stats bar** — Total parts, in-stock count, out-of-stock count
- **Loading skeletons** — Smooth loading states
- **Empty states** — Contextual messaging when no results
- **Mobile responsive** — Sticky search header, responsive grid
- **Production-ready** — Optimized Vite build, environment variables

---

## Folder Structure

```
autostock/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top bar with logo + refresh
│   │   ├── StatsBar.jsx        # Total / In Stock / Out of Stock counters
│   │   ├── SearchBar.jsx       # Search input + filter pills
│   │   ├── ProductCard.jsx     # Individual part card (green/gray)
│   │   ├── LoadingSkeleton.jsx # Animated placeholder cards
│   │   ├── EmptyState.jsx      # No results UI
│   │   └── ErrorState.jsx      # Error UI with retry
│   ├── hooks/
│   │   └── useStock.js         # Supabase data fetching + realtime
│   ├── lib/
│   │   └── supabase.js         # Supabase client initialization
│   ├── App.jsx                 # Root component + search/filter logic
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind + custom styles
├── .env.example                # Template for environment variables
├── .env.local                  # Your actual keys (never commit this!)
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## Supabase Setup

### 1. Create the `stock` table

Run this SQL in your Supabase SQL Editor:

```sql
create table public.stock (
  id          bigint generated always as identity primary key,
  product_name text not null,
  part_no      text,
  remaining    integer not null default 0
);

-- Enable Row Level Security (recommended)
alter table public.stock enable row level security;

-- Allow public read access (for anon key)
create policy "Allow public read"
  on public.stock
  for select
  using (true);
```

### 2. Enable Realtime (optional but recommended)

In Supabase Dashboard → Database → Replication → enable the `stock` table.

### 3. Sample data

```sql
insert into public.stock (product_name, part_no, remaining) values
  ('Front Mudflap Set',       'MF-001-F',  12),
  ('Rear Mudflap Set',        'MF-001-R',   0),
  ('Left Fender Lining',      'FL-202-L',   8),
  ('Right Fender Lining',     'FL-202-R',   3),
  ('Front Fog Lamp Cover LH', 'FLC-301-L',  0),
  ('Front Fog Lamp Cover RH', 'FLC-301-R',  5),
  ('Front Bumper Bracket LH', 'BB-101-L',   2),
  ('Front Bumper Bracket RH', 'BB-101-R',   0),
  ('Rear Bumper Bracket',     'BB-102-R',   7),
  ('Splash Guard Set',        'SG-404',    15);
```

---

## Local Development

### 1. Clone and install

```bash
git clone <your-repo>
cd autostock
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_SUPABASE_URL=https://qgcagtzgwuxbkdiozfix.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

> ⚠️ **Never commit `.env.local` to version control.** It's already in `.gitignore`.

### 3. Start dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. Build for production

```bash
npm run build
npm run preview   # test the production build locally
```

---

## Deployment — Vercel (Recommended)

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Option B: GitHub → Vercel (easiest)

1. Push your code to a GitHub repo (make sure `.env.local` is gitignored)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = `https://qgcagtzgwuxbkdiozfix.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your_anon_key_here`
5. Click **Deploy**

Vercel auto-detects Vite. No extra configuration needed.

### Vercel environment variables

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://qgcagtzgwuxbkdiozfix.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | your anon key from Supabase Dashboard → Settings → API |

---

## Other Hosting Options

### Netlify

```bash
npm run build
# Drag-drop the `dist/` folder to netlify.com/drop
# Or connect GitHub with environment variables in site settings
```

### Cloudflare Pages

```bash
# Build command: npm run build
# Output directory: dist
# Add env vars in Settings → Environment Variables
```

---

## Environment Variable Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Your Supabase anon/public key |

Find these in: Supabase Dashboard → Project Settings → API

---

## Customization

### Add more columns to cards

Edit `src/components/ProductCard.jsx` — add any field from your `stock` table.

### Change color scheme

The green is Tailwind's `emerald-500`. Change references to `emerald` to any Tailwind color like `green`, `teal`, `cyan`, etc.

### Add edit/update functionality

In `useStock.js`, add an `updateStock` function:

```js
export async function updateStock(id, remaining) {
  const { error } = await supabase
    .from('stock')
    .update({ remaining })
    .eq('id', id)
  if (error) throw error
}
```

### Change grid columns

In `App.jsx`, modify the grid class:
```jsx
// 2 columns max
className="grid grid-cols-1 sm:grid-cols-2 gap-3"

// 4 columns on large screens
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
```

---

## Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool + dev server |
| Tailwind CSS | 3 | Utility-first styling |
| Supabase JS | 2 | Database + Realtime client |
| DM Sans | — | Body font (Google Fonts) |
| JetBrains Mono | — | Part number monospace font |
