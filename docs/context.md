# Project Context

## What is Meflan?

Meflan is a lightweight Next.js web application with a Polish cultural theme. Its primary feature is a **MacBook price comparison tool** that aggregates listings from major Polish e-commerce platforms, helping users find the cheapest MacBooks available in Poland.

## Purpose

1. **Price Comparison** - Help users compare MacBook prices across Polish marketplaces (Allegro, OLX, eBay.pl, Amazon.pl, Ceneo) in one place
2. **Dual Currency Display** - Show prices in both PLN and approximate USD for international context
3. **Real-Time Scanning** - Demonstrate live store scanning with streaming progress updates

## Target Audience

- People looking to buy MacBooks in Poland at the best price
- Polish-speaking users who shop across multiple e-commerce platforms

## Key Features

### MacBook Price Comparison (`/macbooks`)

- **Sortable table** with columns for model, chip, RAM, storage, price, store, condition, and direct listing links
- **Chip filtering** - Filter results by processor (M1, M2, M1 Pro, M2 Pro, M2 Max)
- **Dual pricing** - Every price shown in PLN (primary) and approximate USD
- **Direct listing links** - Each row has a "Zobacz" (View) button linking to the actual listing on the source marketplace
- **Live scanning** - Click "Skanuj teraz" (Scan Now) to trigger a simulated real-time scan of Polish stores with a streaming progress log
- **Condition labels** - Listings marked as Nowy (New), Używany (Used), or Odnowiony (Refurbished)

### Navigation & Design

- Responsive layout with mobile hamburger menu and desktop navigation
- Polish-themed background imagery with separate mobile/desktop assets
- Clean card-based content areas with subtle shadows and rounded corners

### Streaming API (`/api/scan-macbooks`)

- Edge runtime endpoint using Server-Sent Events (SSE)
- Streams real-time progress logs as each store is scanned
- Returns aggregated results with realistic per-listing URLs

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **TypeScript 5.9**
- **No additional dependencies** - pure React with inline styles

## Polish Localization

The UI is written in Polish:

| Polish | English |
|--------|---------|
| Skanuj teraz | Scan now |
| Skanowanie | Scanning |
| Filtruj wedlug chipa | Filter by chip |
| Wszystkie | All |
| Cena | Price |
| Sklep | Store |
| Stan | Condition |
| Dysk | Storage |
| Nowy | New |
| Uzywany | Used |
| Odnowiony | Refurbished |
| Zobacz | View |

## Current State

The scan API currently generates **mock data** - it simulates store scanning with random listings. The initial data on the MacBooks page is hardcoded. A future iteration could integrate real scraping or marketplace APIs to provide live pricing data.

## Project History

The project started as a simple "Hello Poland" greeting page and evolved through these milestones:

1. Initial setup with Poland theme and responsive backgrounds
2. Added About page and navigation
3. Built the MacBooks price comparison table with sorting and filtering
4. Added live store scanning with SSE streaming
5. Added dual PLN/USD pricing and direct listing links
