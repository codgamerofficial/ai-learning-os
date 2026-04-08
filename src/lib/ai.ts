import type { ChatMessage, PerformanceRow } from '../types'
import type { AiApiResponse, AiRequestPayload, AiResponsePayload } from './ai-contract'
import {
  buildMockHomeworkSimple,
  buildMockHomeworkSolution,
  buildMockPerformanceInsight,
  buildMockPracticeQuestions,
  buildMockQuiz,
  buildMockStudyAnswer,
  buildMockSummary,
  extractKeywords,
} from './mockAi'

type AiRuntime = {
  mode: 'mock' | 'secure'
  label: string
  detail: string
}

function getProvider() {
  return import.meta.env.VITE_AI_PROVIDER || 'mock'
}

export function getAiRuntime(): AiRuntime {
  if (getProvider() === 'server') {
    return {
      mode: 'secure',
      label: 'Secure AI',
      detail: 'Requests are sent through a Vercel Function so your model key stays server-side.',
    }
  }

  return {
    mode: 'mock',
    label: 'Demo AI',
    detail: 'The app is running in polished demo mode until you enable the secure server integration.',
  }
}

export { extractKeywords }

async function callSecureAi<TTask extends AiRequestPayload['task']>(
  payload: Extract<AiRequestPayload, { task: TTask }>,
) {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const result = (await response.json()) as AiApiResponse

  if (!response.ok || !result.ok) {
    const reason = result.ok ? `Request failed with ${response.status}` : result.error
    throw new Error(reason)
  }

  return result.data as Extract<AiResponsePayload, { task: TTask }>
}

export async function generateSummary(notes: string) {
  if (getAiRuntime().mode === 'mock') {
    return buildMockSummary(notes)
  }

  try {
    const response = await callSecureAi({ task: 'study-summary', notes })
    return response.bullets
  } catch {
    return buildMockSummary(notes)
  }
}

export async function generateQuiz(notes: string) {
  if (getAiRuntime().mode === 'mock') {
    return buildMockQuiz(notes)
  }

  try {
    const response = await callSecureAi({ task: 'study-quiz', notes })
    return response.questions
  } catch {
    return buildMockQuiz(notes)
  }
}

export async function answerStudyQuestion(notes: string, question: string, history: ChatMessage[]) {
  if (getAiRuntime().mode === 'mock') {
    return buildMockStudyAnswer(notes, question)
  }

  try {
    const response = await callSecureAi({ task: 'study-chat', notes, question, history })
    return response.answer
  } catch {
    return buildMockStudyAnswer(notes, question)
  }
}

export async function analyzePerformance(rows: PerformanceRow[]) {
  if (getAiRuntime().mode === 'mock') {
    return buildMockPerformanceInsight(rows)
  }

  try {
    const response = await callSecureAi({ task: 'performance-insights', rows })
    return response.insight
  } catch {
    return buildMockPerformanceInsight(rows)
  }
}

export async function solveHomework(question: string) {
  if (getAiRuntime().mode === 'mock') {
    return buildMockHomeworkSolution(question)
  }

  try {
    const response = await callSecureAi({ task: 'homework-solve', question })
    return response.steps
  } catch {
    return buildMockHomeworkSolution(question)
  }
}

export async function explainHomeworkSimply(question: string) {
  if (getAiRuntime().mode === 'mock') {
    return buildMockHomeworkSimple(question)
  }

  try {
    const response = await callSecureAi({ task: 'homework-simple', question })
    return response.explanation
  } catch {
    return buildMockHomeworkSimple(question)
  }
}

export async function generateSimilarQuestions(question: string) {
  if (getAiRuntime().mode === 'mock') {
    return buildMockPracticeQuestions(question)
  }

  try {
    const response = await callSecureAi({ task: 'homework-practice', question })
    return response.questions
  } catch {
    return buildMockPracticeQuestions(question)
  }
}
