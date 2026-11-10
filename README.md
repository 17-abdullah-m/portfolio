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
- A downloadable text bio using the user's supplied details
- A contact form that opens a prefilled email draft in the visitor's email app

The contact form does not send email or store submissions. Visitors review and send the draft themselves. No API keys or backend credentials are needed.

## Personal details

Edit `profile.js` for the contact links, downloadable bio details, and portrait source. The visible page biography, skill cards, and education text are in `index.html`. The currently configured links and email were supplied by the user. LinkedIn was not independently fetched or verified.

### Portrait

`assets/portrait.png` is a square portrait prepared from the user's supplied photograph. The visible profile image and `profile.js` both point to this local asset. The card uses circular clipping in CSS. The monogram asset remains as a fallback if an image fails to load.

### Credentials and projects

The user provided Virtual University, Lahore, but no degree name, employment history, or earned certificates. Those details have not been invented. Certification content is identified as a learning focus until actual credentials are supplied. The illustrated projects are explicitly labeled concepts, not completed client work or awards. Ecosystem tools are described by their role in agent development rather than claimed certifications or proficiency ratings. Local logo provenance is documented in `assets/logos/NOTICE.md`.

The live reference domain was blocked by the environment network policy. The supplied screenshots guided the visual design; original animation timing could not be inspected. The site implements its own card, cursor, marquee, title, and reveal animations.

## Environment

Use the existing `/workspace/portfolio` checkout. Each cloud task is isolated; do not create a worktree unless requested. Dependencies and build files can persist in a snapshot, but the development server must be started again in a new task.
