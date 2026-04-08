export type ThemeMode = 'light' | 'dark'
export type StudyTab = 'summary' | 'quiz' | 'chat'
export type HomeworkTab = 'solution' | 'simple' | 'practice'

export interface QuizQuestion {
  question: string
  options: string[]
  answer: string
  explanation: string
}

export interface ChatMessage {
  id: string
  role: 'assistant' | 'user'
  content: string
}

export interface PerformanceRow {
  id: string
  subject: string
  current: number
  previous: number
  target: number
  focus: string
}

export interface PerformanceInsight {
  weakAreas: string[]
  studyPlan: string[]
  priorityTopics: string[]
  narrative: string
}
