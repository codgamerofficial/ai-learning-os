# AI Learning OS

AI Learning OS is a Vite-based student workspace that combines three high-value academic workflows in one product:

- Study Copilot
- Performance Dashboard
- Homework Solver

The goal is to feel like a real product, not a pile of disconnected demos.

## What It Does

### Study Copilot

- Paste or upload notes
- Generate student-friendly bullet summaries
- Create MCQ quizzes
- Ask grounded follow-up questions in a tutor chat

### Performance Dashboard

- Enter subjects and marks in an editable table
- Compare current, previous, and target scores
- Visualize progress with charts
- Generate AI-style insights, weak areas, and study priorities

### Homework Solver

- Paste a homework prompt
- Get a step-by-step solution
- Rewrite the explanation in simpler language
- Generate similar practice questions

## Product Highlights

- React + Vite app with a thin Vercel server function for secure AI calls
- Tailwind CSS v4 styling
- Local-first persistence with `localStorage`
- Dark mode
- Exportable outputs
- Demo-ready sample data
- Lazy-loaded module screens for lighter first load

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React

## AI Mode

The app supports two modes:

### Demo mode

Default mode. The app uses polished local logic and sample data so the UX works immediately without any credentials.

### Secure AI mode

Set `VITE_AI_PROVIDER=server` on the frontend and configure the server-side env vars in Vercel. The browser talks to `/api/ai`, and the model key stays inside the Vercel Function.

## Local Development

```bash
npm install
npm run dev
```

`npm run dev` is enough for mock mode.

If you want to test the secure server route locally, use `vercel dev` so the `api/` function runs alongside the Vite app.

## Environment Variables

Copy [`.env.example`](D:\Ai Student Copilot\.env.example) to `.env` and adjust it for local mock mode or secure mode.

```env
VITE_AI_PROVIDER=mock

# Server-side only variables for Vercel Functions or `vercel dev`
AI_API_KEY=
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4.1-mini
```

Recommended Vercel setup:

- Frontend env var: `VITE_AI_PROVIDER=server`
- Server env vars: `AI_API_KEY`, `AI_BASE_URL`, `AI_MODEL`

If `VITE_AI_PROVIDER` is left as `mock`, the product stays in demo mode.

## Build

```bash
npm run build
npm run lint
```

## Demo Flow

1. Open Study Copilot and paste notes.
2. Generate a summary.
3. Generate quiz questions.
4. Switch to Performance Dashboard and enter marks.
5. Review charts and AI insights.
6. Open Homework Solver and solve a sample problem.

## Project Structure

```text
src/
  components/
    ui.tsx
  data/
    sampleData.ts
  hooks/
    useLocalStorageState.ts
  lib/
    ai-contract.ts
    ai.ts
    export.ts
    mockAi.ts
  modules/
    StudyCopilot.tsx
    PerformanceDashboard.tsx
    HomeworkSolver.tsx
  App.tsx
  index.css
api/
  ai.ts
vercel.json
```

## Current Status

- Build passes
- Lint passes
- Secure AI route is implemented through `/api/ai`
- Preview deployment is available on Vercel
