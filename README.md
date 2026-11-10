# Abdullah Malik — Personal Portfolio

🚀 Personal Portfolio | Showcasing AI Agents, Automation, SaaS Applications & Modern Web Development Projects — Turning Ideas Into Real-World Solutions.

An animated, responsive portfolio for Abdullah Malik, an AI Agent & Automation Developer focused on Python AI agents, workflow engineering, and vibe coding. The dark layout follows the reference screenshots supplied by the user.

## Run

Requires Node.js 22.13 or newer. No third-party runtime dependencies are needed.

```sh
npm run dev
```

The server uses port 5173; set `PORT` to change it.

```sh
npm run build
npm run preview
```

The build produces a static website in `dist/`. Vercel settings are included in `vercel.json`.

## Deploy on Vercel

1. Sign in at https://vercel.com/new and import `17-abdullah-m/portfolio`.
2. Use branch `main` and repository root. The included configuration sets the build command to `npm run build` and output directory to `dist`.
3. Click Deploy. Vercel supplies the live URL when its deployment succeeds.

No application secrets or environment variables are required. Vercel account authorization is required to create the deployment. The model has pushed the source but has not verified a Vercel deployment. The static `gh-pages` branch is maintained separately.

## Features

- Dark and light themes, with an optional saved preference
- Profile card with pointer tilt, drag, keyboard controls, and a reversible face
- Rotating role text, animated background, a logo marquee, scroll reveals, and a pointer glow
- Locally served Python, OpenAI, LangChain, FastAPI, n8n, Docker, and GitHub brand marks
- Python agent development content, an agent-system concept, and an agent ecosystem guide
- Skill category filters, expandable focus cards, and project concept dialogs
- Floating navigation with active section tracking and mobile navigation
- Accessible form labels, keyboard navigation, and reduced-motion support
- A downloadable one-page PDF resume using the user's supplied details
- A Blog section with a standalone, source-backed AI engineering article
- A contact form that opens a prefilled email draft in the visitor's email app

The contact form does not send email or store submissions. Visitors review and send the draft themselves. No API keys or backend credentials are needed.

## Personal details

Edit `profile.js` for the contact links, professional headline, and portrait source. The visible page profile, skill cards, and education text are in `index.html`. Resume content is in `resume.html`; the downloadable file is `assets/Abdullah-Malik-Resume.pdf`. The currently configured links and email were supplied by the user. LinkedIn was not independently fetched or verified.

### Portrait

`assets/portrait.png` is a square portrait prepared from the user's supplied photograph. The visible profile image and `profile.js` both point to this local asset. The card uses circular clipping in CSS. The monogram asset remains as a fallback if an image fails to load.

### Credentials and projects

The user provided Virtual University, Lahore, but no degree name, employment history, or earned certificates. Those details have not been invented. The Learning & Development section describes areas of technical exploration without claiming earned certificates. The selected project cards include Skydust Connection and DispatchPro, based on the user’s project source and documentation. ClientFlow is presented as an interface study until its specific project details are supplied. Recreated interface previews are labeled as illustrations or studies. Additional architecture concepts remain explicitly identified as concept studies. Ecosystem tools are described by their role in agent development rather than claimed certifications or proficiency ratings. Local logo provenance is documented in `assets/logos/NOTICE.md`.

The live reference domain was blocked by the environment network policy. The supplied screenshots guided the visual design; original animation timing could not be inspected. The site implements its own card, cursor, marquee, title, and reveal animations.

## Environment

Use the existing `/workspace/portfolio` checkout. Each cloud task is isolated; do not create a worktree unless requested. Dependencies and build files can persist in a snapshot, but the development server must be started again in a new task.

## Updating the resume

Edit `resume.html`, open it through the development server, and use Print / Save as PDF with A4 paper and the document's CSS margins. Save the result as `assets/Abdullah-Malik-Resume.pdf`, then run `npm run build`. The PDF is a committed static asset; Vercel does not need a browser or PDF-generation dependency. Resume links work without JavaScript.

## Selected project sources

- **Skydust Connection:** https://github.com/17-abdullah-m/skydust-connection — the README, `app/layout.tsx`, product catalog, and package manifest establish the fragrance storefront and stack. Its original diffuser hero image is reused in the portfolio preview.
- **DispatchPro:** the project overview in this repository's history at `cf6d2cb22c2c2a8be116c8b004158b3ce8aaf5a1` describes the browser-based truck dispatch dashboard. Its portfolio preview is an illustration with sample records. No unprovided live URL is advertised.
- **ClientFlow:** only the project name has been supplied. The card is a clearly labeled client-workflow interface study, without specific integrations, technology claims, or a fabricated demo link. Replace this preliminary overview when the project source or feature details are provided.

## Blog and article freshness

The home page links to `blog/openai-python-typed-async-tools.html`, with shared portfolio styling and a standalone theme script. The build copies the entire `blog/` directory into `dist/blog/`. New article links must use relative paths so they work on GitHub Pages and Vercel.

The first article covers OpenAI Python SDK v3.49.0. Its official release page records publication at **2026-11-10 06:47:04 UTC**. The original release and linked implementation were checked at **2026-11-10 20:56:45 UTC** (11 November, 1:56 AM in Asia/Karachi), about 14 hours later and within the requested 24-hour window. Article dates use Asia/Karachi. This is a dated release analysis, not an automatically updating news feed.

Primary sources:
- https://github.com/openai/openai-python/releases/tag/v3.49.0
- https://github.com/openai/openai-python/commit/ea07983f796144835ab3f2cad38fdca04c997a0e

The article distinguishes the beta agent API type changes from the author's workflow interpretation and hypothetical examples. It does not claim measured performance improvements or a new model launch.
