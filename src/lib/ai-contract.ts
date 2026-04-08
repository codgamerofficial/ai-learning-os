import type { ChatMessage, PerformanceInsight, PerformanceRow, QuizQuestion } from '../types'

export type AiTask =
  | 'study-summary'
  | 'study-quiz'
  | 'study-chat'
  | 'performance-insights'
  | 'homework-solve'
  | 'homework-simple'
  | 'homework-practice'

export type AiRequestPayload =
  | { task: 'study-summary'; notes: string }
  | { task: 'study-quiz'; notes: string }
  | { task: 'study-chat'; notes: string; question: string; history: ChatMessage[] }
  | { task: 'performance-insights'; rows: PerformanceRow[] }
  | { task: 'homework-solve'; question: string }
  | { task: 'homework-simple'; question: string }
  | { task: 'homework-practice'; question: string }

export type AiResponsePayload =
  | { task: 'study-summary'; bullets: string[] }
  | { task: 'study-quiz'; questions: QuizQuestion[] }
  | { task: 'study-chat'; answer: string }
  | { task: 'performance-insights'; insight: PerformanceInsight }
  | { task: 'homework-solve'; steps: string[] }
  | { task: 'homework-simple'; explanation: string }
  | { task: 'homework-practice'; questions: string[] }

export type AiApiSuccess = {
  ok: true
  data: AiResponsePayload
}

export type AiApiFailure = {
  ok: false
  error: string
}

export type AiApiResponse = AiApiSuccess | AiApiFailure
