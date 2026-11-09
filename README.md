# DispatchPro — Truck Dispatching Dashboard

**Manage loads. Negotiate smarter. Make every mile count.**

DispatchPro is an interactive truck dispatching dashboard developed by **Abdullah Malik**. It brings load management, pickup and delivery schedules, broker negotiations, carrier and truck details, and dispatch earnings into one clear workspace.

This public portfolio demo lets visitors explore a realistic dispatch workflow using editable sample records. Every visitor gets an independent demo in their own browser.

## Why DispatchPro?

- **Organize dispatch operations:** Keep routes, appointments, brokers, carrier assignments, and load status together.
- **Support informed rate negotiations:** Compare broker offers, target rates, and negotiated rates before confirming a load.
- **Understand revenue per mile:** Include loaded and deadhead miles in a single rate-per-mile calculation.
- **Coordinate carriers:** View driver contacts, equipment types, truck/trailer numbers, and weight capacities alongside load information.
- **Track dispatch earnings:** Calculate percentage-based dispatch fees and net earnings after dispatch expenses.
- **Review work quickly:** Search loads, filter statuses, switch between table and board views, and export records to CSV.
- **Explore with confidence:** Form validation catches invalid dates, zero loaded mileage, duplicate references, and missing carrier assignments when booking.

These benefits describe how the interface supports a workflow; the demo does not guarantee financial results.

## Features

### Load management

Create, edit, and remove loads with pickup and delivery cities, facility addresses, appointment dates, brokers and contacts, commodities, weight, mileage, and notes.

### Rates and negotiation

Record the broker rate, target rate, and negotiated rate. A live calculator updates effective rate, total miles, rate per mile, dispatch fee, and net dispatch earnings as you edit.

### Carriers and trucks

Manage carrier companies, MC numbers, driver names and phone numbers, equipment type, truck/trailer identifiers, and weight capacities. Select a carrier from the load editor.

### Status workflow

`Available → Negotiating → Booked → In transit → Delivered → Paid`

Cancelled loads are supported. A carrier is required for Booked, In transit, Delivered, and Paid statuses.

### Earnings and reporting

- Booked revenue includes Booked, In transit, Delivered, and Paid loads.
- Average RPM is weighted by total loaded and deadhead miles.
- Earned dispatch fees include Delivered and Paid loads.
- Other fees remain projected.
- Paid refers to the broker payment status.
- CSV exports follow the board’s active filters; other views export the selected date range.

## Calculations

| Calculation | Formula |
| --- | --- |
| Effective rate | Negotiated rate, if entered; otherwise broker rate |
| Total miles | Loaded miles + deadhead miles |
| Rate per mile | Effective rate ÷ total miles |
| Dispatch fee | Effective rate × dispatch fee percentage ÷ 100 |
| Net dispatch earnings | Dispatch fee − dispatch business expenses |

An explicit negotiated rate of zero remains zero. It does not fall back to the broker rate.

**Example:** A $1,250 load over 450 loaded miles and 50 deadhead miles earns $2.50 per total mile. A 5% dispatch fee is $62.50; after $10 in dispatch expenses, net dispatch earnings are $52.50.

## Try the demo

1. Open a sample load or select **New load**.
2. Enter a route, dates, broker offer, target rate, and mileage.
3. Choose a carrier and enter an agreed rate.
4. Move the load through booking, delivery, and payment.
5. Review the updated metrics and earnings, or download a CSV.
6. Use **Reset demo** to restore fresh sample records in your browser.

The **About project** view includes the project overview, benefits, technology stack, and a quick walkthrough.

## Demo data and scope

This is a browser-based public portfolio demonstration. It starts with fictional sample carrier and load records. Changes are stored in local browser storage and are not shared with other visitors or synchronized between devices. Clearing browser data can remove your changes. If browser storage cannot be accessed, the app can use temporary in-tab state; storage quota errors are surfaced before a save is reported as successful.

Use sample information when exploring. The demo does not book freight, contact brokers, dispatch real trucks, process payments, or provide live GPS tracking. Addresses and mileage are entered manually.

## Technology

- React 19 and TypeScript
- Vite 8
- Lucide icons
- Zod validation
- Browser local storage with revision checks for stale edits
- Vercel hosting
- Responsive custom CSS

## Run locally

Requires Node.js 22.13 or newer and npm.

```bash
npm ci
npm run dev
```

## Validate and build

```bash
npm test
npm run build
npm run preview
```

Tests cover business calculations, valid dates and mileage, carrier integrity, unique references, browser persistence, visitor isolation, reset behavior, and stale-edit rejection. The build includes TypeScript checks.

## GitHub Pages setup

A prebuilt static site is included in `docs/`. To enable its public website, open this repository’s **Settings → Pages** and select **Deploy from a branch**, branch **main**, folder **/docs**, then save. GitHub will show the website URL when publication finishes.

The source uses relative asset paths so the same build works under a GitHub Pages project path or on Vercel. To refresh the prebuilt Pages site after changes:

```bash
npm ci
npm test
npm run build
npm run pages:prepare
```

Commit the source and updated `docs/` directory together. No access tokens or secrets are needed for a branch-based Pages site.

## Deployment

The included `vercel.json` configures Vite, the build command, output directory, and basic response headers. No API keys, server database, or environment variables are required for this demo.

For future Git-based deployments, upload this source to a GitHub repository, import that repository into Vercel, and use the included settings. The main branch can then be used for automatic production deployments.

## Project description

> DispatchPro is an interactive truck dispatching dashboard that simplifies load management, broker-rate negotiation, carrier coordination, and dispatch earnings analysis. It helps users keep operations organized, compare rates, account for deadhead miles, and follow every load from availability to payment in one practical workspace.

**Suggested repository topics:** `truck-dispatching`, `logistics`, `dashboard`, `react`, `typescript`, `vite`, `vercel`, `portfolio`, `rate-per-mile`, `dispatch-management`.

**Developer:** [Abdullah Malik](https://github.com/17-abdullah-m)
