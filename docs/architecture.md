# Architecture

## High-Level Overview

```mermaid
graph TD
    subgraph Client["Browser (Client Components)"]
        Home["/ (Home)"]
        About["/about (About)"]
        Macbooks["/macbooks (MacBooks)"]
    end

    subgraph Server["Next.js Server"]
        Layout["Root Layout"]
        API["/api/scan-macbooks"]
    end

    subgraph Assets["Static Assets"]
        BgDesktop["poland-background.jpg"]
        BgMobile["poland-background-mobile.jpg"]
    end

    Layout --> Home
    Layout --> About
    Layout --> Macbooks
    Macbooks -- "POST (SSE stream)" --> API
    API -- "progress logs + results" --> Macbooks
    Home --> Assets
    About --> Assets
    Macbooks --> Assets
```

## Route Map

```mermaid
graph LR
    subgraph Pages
        H["/ Home"]
        A["/about"]
        M["/macbooks"]
    end

    subgraph API
        S["/api/scan-macbooks"]
    end

    H -- nav --> A
    H -- nav --> M
    A -- nav --> H
    A -- nav --> M
    M -- nav --> H
    M -- nav --> A
    M -- "POST" --> S
```

## Directory Structure

```
meflan/
├── app/
│   ├── layout.tsx              # Root layout (metadata, global HTML shell)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles + responsive background
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── macbooks/
│   │   └── page.tsx            # MacBooks comparison page
│   └── api/
│       └── scan-macbooks/
│           └── route.ts        # SSE streaming API endpoint (Edge runtime)
├── public/
│   ├── poland-background.jpg       # Desktop background
│   └── poland-background-mobile.jpg # Mobile background
├── package.json
├── tsconfig.json
└── docs/
    ├── architecture.md         # This file
    └── context.md              # Project context and features
```

## Data Flow: MacBook Scanning

```mermaid
sequenceDiagram
    participant User
    participant Page as /macbooks (Client)
    participant API as /api/scan-macbooks (Edge)

    Note over Page: Displays initial hardcoded listings

    User->>Page: Clicks "Skanuj teraz"
    Page->>API: POST /api/scan-macbooks
    activate API

    loop For each store (Allegro, OLX, eBay, Amazon, Ceneo)
        API-->>Page: SSE: {"log": "Scanning Store..."}
        Note over API: Simulated 1.5s scan delay
        API-->>Page: SSE: {"log": "Found N listings on Store"}
    end

    API-->>Page: SSE: {"log": "...", "results": [...]}
    deactivate API

    Page->>Page: Updates table with new results
    Note over Page: User can sort and filter results
```

## Component Architecture

```mermaid
graph TD
    subgraph "Root Layout (Server Component)"
        Meta["Metadata: title, description"]
        HTML["HTML shell + viewport"]
        CSS["globals.css"]
    end

    subgraph "Page Components (Client)"
        subgraph Shared["Shared UI Pattern (all pages)"]
            Nav["Fixed Navbar"]
            Hamburger["Hamburger Menu Button"]
            MobileMenu["Mobile Dropdown Menu"]
            BgContainer["Background Container + Overlay"]
        end

        subgraph HomeSpecific["Home Page"]
            Greeting["Greeting Card"]
        end

        subgraph AboutSpecific["About Page"]
            Info["Info Card"]
        end

        subgraph MacbooksSpecific["MacBooks Page"]
            ScanBtn["Scan Button"]
            LogPanel["Live Progress Log"]
            ChipFilter["Chip Filter Buttons"]
            Table["Sortable Comparison Table"]
            LinkCol["Listing Link Buttons"]
        end
    end

    HTML --> Shared
    Shared --> HomeSpecific
    Shared --> AboutSpecific
    Shared --> MacbooksSpecific
```

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| UI | React | 19.0.0 |
| Language | TypeScript | 5.9.3 |
| Styling | Inline styles + globals.css | - |
| API Runtime | Edge (Vercel Edge Functions) | - |
| Streaming | Server-Sent Events (SSE) | - |

## Key Architectural Decisions

- **App Router** over Pages Router for modern file-based routing
- **Client Components** (`'use client'`) for all pages due to interactive state
- **Edge Runtime** for the scan API to enable low-latency streaming
- **Inline styles** instead of CSS modules or Tailwind for simplicity
- **No external UI libraries** to keep the bundle minimal
- **SSE streaming** for real-time scan progress instead of polling or WebSockets
- **Local component state** (`useState`) instead of global state management
