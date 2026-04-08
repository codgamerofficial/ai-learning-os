import clsx from 'clsx'
import { Suspense, lazy, useEffect, useState } from 'react'
import {
  AlertTriangle,
  BarChart3,
  MoonStar,
  NotebookPen,
  Sigma,
  Sparkles,
  SunMedium,
  X,
  type LucideIcon,
} from 'lucide-react'
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

import { getAiRuntime, onAiFallback, type AiFallbackNotice } from './lib/ai'
import { useLocalStorageState } from './hooks/useLocalStorageState'
import type { ThemeMode } from './types'

const StudyCopilot = lazy(() =>
  import('./modules/StudyCopilot').then((module) => ({
    default: module.StudyCopilot,
  })),
)

const PerformanceDashboard = lazy(() =>
  import('./modules/PerformanceDashboard').then((module) => ({
    default: module.PerformanceDashboard,
  })),
)

const HomeworkSolver = lazy(() =>
  import('./modules/HomeworkSolver').then((module) => ({
    default: module.HomeworkSolver,
  })),
)

type NavigationItem = {
  path: string
  label: string
  description: string
  detail: string
  icon: LucideIcon
}

const navigation: NavigationItem[] = [
  {
    path: '/study',
    label: 'Study Copilot',
    description: 'Summaries, quizzes, and note-grounded chat.',
    detail: 'Turn raw class material into something you can actually revise from.',
    icon: NotebookPen,
  },
  {
    path: '/performance',
    label: 'Performance Dashboard',
    description: 'Charts, weak spots, and tailored study planning.',
    detail: 'Make the marks visible, then make the next moves obvious.',
    icon: BarChart3,
  },
  {
    path: '/homework',
    label: 'Homework Solver',
    description: 'Step-by-step help with simpler explanations.',
    detail: 'Get reasoning, clarity, and follow-up practice in one loop.',
    icon: Sigma,
  },
]

function AppFrame({
  theme,
  setTheme,
}: {
  theme: ThemeMode
  setTheme: (value: ThemeMode) => void
}) {
  const [aiNotice, setAiNotice] = useState<AiFallbackNotice | null>(null)
  const location = useLocation()
  const currentPage =
    navigation.find((item) => item.path === location.pathname) || navigation[0]
  const aiRuntime = getAiRuntime()

  useEffect(() => {
    document.title = `${currentPage.label} | AI Learning OS`
  }, [currentPage.label])

  useEffect(() => onAiFallback((notice) => setAiNotice(notice)), [])

  return (
    <div className="min-h-screen px-3 py-3 md:px-5 md:py-5">
      <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="rounded-[34px] border border-[rgb(var(--sidebar-line))] bg-[rgb(var(--sidebar-bg))] p-5 text-[rgb(var(--sidebar-text))] shadow-[0_24px_80px_rgba(2,6,23,0.24)] md:p-6 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)]">
          <div className="flex h-full flex-col">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.08] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em]">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Learning OS
                </div>
                <div className="space-y-2">
                  <h1 className="font-display text-[2.1rem] leading-none tracking-[-0.05em]">
                    One workspace for studying, tracking progress, and solving homework.
                  </h1>
                  <p className="text-sm leading-6 text-[rgb(var(--sidebar-muted))]">
                    Calm enough for daily use, polished enough to feel like a real product in a portfolio review.
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        clsx(
                          'block rounded-[24px] border px-4 py-4 transition',
                          isActive
                            ? 'border-white/[0.12] bg-white/[0.1]'
                            : 'border-transparent bg-white/[0.03] hover:border-white/[0.1] hover:bg-white/[0.06]',
                        )
                      }
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">{item.label}</p>
                          <p className="text-sm leading-5 text-[rgb(var(--sidebar-muted))]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </NavLink>
                  )
                })}
              </nav>
            </div>

            <div className="mt-auto space-y-4 pt-6">
              <div className="rounded-[26px] border border-white/[0.12] bg-white/[0.05] p-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[rgb(var(--sidebar-muted))]">
                  Demo flow
                </p>
                <div className="mt-3 space-y-3 text-sm leading-6">
                  <p>1. Paste notes and generate a summary.</p>
                  <p>2. Build a quiz from the same source.</p>
                  <p>3. Enter marks and surface weak areas.</p>
                  <p>4. Solve a homework problem step by step.</p>
                </div>
              </div>

              <div className="rounded-[26px] border border-white/[0.12] bg-white/[0.05] p-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[rgb(var(--sidebar-muted))]">
                  AI mode
                </p>
                <p className="mt-2 text-base font-semibold">{aiRuntime.label}</p>
                <p className="mt-2 text-sm leading-6 text-[rgb(var(--sidebar-muted))]">
                  {aiRuntime.detail}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="rounded-[34px] border border-[rgb(var(--line))] bg-[rgb(var(--shell))] shadow-[var(--panel-shadow)] backdrop-blur-xl">
          <header className="border-b border-[rgb(var(--line))] px-5 py-5 md:px-8 md:py-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--line))] bg-[rgb(var(--panel-strong))] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[rgb(var(--accent-strong))]">
                  Workspace Module
                </div>
                <div className="space-y-2">
                  <h2 className="font-display text-[2.4rem] leading-none tracking-[-0.05em] text-[rgb(var(--text))]">
                    {currentPage.label}
                  </h2>
                  <p className="max-w-3xl text-sm leading-6 text-[rgb(var(--muted))] md:text-[0.98rem]">
                    {currentPage.detail}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[rgb(var(--accent-border))] bg-[rgb(var(--accent-soft))] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent-strong))]">
                  Local-first outputs
                </span>
                <span className="rounded-full border border-[rgb(var(--line))] bg-[rgb(var(--panel-strong))] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                  Frontend-only
                </span>
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--line))] bg-[rgb(var(--panel-strong))] px-4 py-2 text-sm font-semibold text-[rgb(var(--text))] transition hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  {theme === 'light' ? (
                    <MoonStar className="h-4 w-4" />
                  ) : (
                    <SunMedium className="h-4 w-4" />
                  )}
                  {theme === 'light' ? 'Dark mode' : 'Light mode'}
                </button>
              </div>
            </div>
          </header>

          {aiNotice ? (
            <div className="border-b border-[rgb(var(--line))] px-5 py-4 md:px-8">
              <div className="flex flex-col gap-4 rounded-[26px] border border-amber-500/20 bg-[rgba(245,158,11,0.08)] p-4 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-300">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[rgb(var(--text))]">
                      {aiNotice.title}
                    </p>
                    <p className="text-sm leading-6 text-[rgb(var(--text))]">
                      {aiNotice.message}
                    </p>
                    <p className="text-sm leading-6 text-[rgb(var(--muted))]">
                      The workspace stayed usable, but this result came from local fallback logic instead of the live model response.
                    </p>
                  </div>
                </div>
                <button
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--line))] bg-[rgb(var(--panel-strong))] text-[rgb(var(--muted))] transition hover:border-amber-500/30 hover:text-[rgb(var(--text))]"
                  onClick={() => setAiNotice(null)}
                  aria-label="Dismiss AI warning"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : null}

          <div className="px-5 py-5 md:px-8 md:py-8">
            <Suspense fallback={<ModuleFallback />}>
              <Routes>
                <Route path="/" element={<Navigate to="/study" replace />} />
                <Route path="/study" element={<StudyCopilot />} />
                <Route path="/performance" element={<PerformanceDashboard />} />
                <Route path="/homework" element={<HomeworkSolver />} />
                <Route path="*" element={<Navigate to="/study" replace />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}

function ModuleFallback() {
  return (
    <div className="rounded-[30px] border border-[rgb(var(--line))] bg-[rgb(var(--panel))] p-10 text-center shadow-[var(--panel-shadow)]">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[rgb(var(--accent-strong))]">
        Loading Workspace
      </p>
      <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted))]">
        Pulling in the selected module and preparing its local data.
      </p>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useLocalStorageState<ThemeMode>('ailos.theme', 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <BrowserRouter>
      <AppFrame theme={theme} setTheme={setTheme} />
    </BrowserRouter>
  )
}

export default App