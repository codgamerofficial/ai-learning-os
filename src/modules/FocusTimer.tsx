import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Timer } from 'lucide-react'
import { Panel, SectionTitle } from '../components/ui'

export function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState<'focus' | 'break'>('focus')
  
  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60
  const progress = ((totalTime - timeLeft) / totalTime) * 100
  const strokeDasharray = `${(progress / 100) * 283} 283`

  useEffect(() => {
    let interval: number | undefined
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      // Switch automatically or just stop
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  function toggleTimer() {
    setIsActive(!isActive)
  }

  function resetTimer() {
    setIsActive(false)
    setTimeLeft(totalTime)
  }

  function switchMode(newMode: 'focus' | 'break') {
    setMode(newMode)
    setIsActive(false)
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60)
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  
  return (
    <div className="space-y-6">
      <Panel className="space-y-8 flex flex-col items-center py-12">
        <SectionTitle
          eyebrow="Module 4"
          title="Focus Timer"
          body="Use the Pomodoro technique to stay sharp. 25 minutes of deep work, 5 minutes of rest."
        />
        
        <div className="flex gap-4 p-1.5 bg-black/5 dark:bg-white/5 rounded-full">
          <button
            onClick={() => switchMode('focus')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'focus' ? 'bg-[rgb(var(--accent))] text-white shadow-lg' : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]'}`}
          >
            Focus
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'break' ? 'bg-[rgb(var(--accent))] text-white shadow-lg' : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]'}`}
          >
            Break
          </button>
        </div>

        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              className="text-[rgb(var(--line))] stroke-current"
              strokeWidth="4"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
            />
            <motion.circle
              className="text-[rgb(var(--accent))] stroke-current"
              strokeWidth="4"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              initial={{ strokeDasharray: "0 283" }}
              animate={{ strokeDasharray }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </svg>
          <div className="text-center z-10">
            <h2 className="text-6xl font-display font-bold text-[rgb(var(--text))] tracking-tighter">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-[rgb(var(--muted))]">
              {mode === 'focus' ? 'Deep Work' : 'Resting'}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTimer}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--accent))] text-white shadow-xl hover:bg-[rgb(var(--accent-strong))]"
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetTimer}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgb(var(--line))] bg-[rgb(var(--panel-strong))] text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] hover:border-[rgb(var(--accent-border))]"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
        </div>
      </Panel>
    </div>
  )
}
