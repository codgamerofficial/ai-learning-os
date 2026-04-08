import clsx from 'clsx'
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react'

export function Panel({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'section'>) {
  return (
    <section
      className={clsx(
        'rounded-[30px] border border-[rgb(var(--line))] bg-[rgb(var(--panel))] p-5 shadow-[var(--panel-shadow)] backdrop-blur-xl md:p-6',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export function SectionTitle({
  eyebrow,
  title,
  body,
  action,
}: {
  eyebrow?: string
  title: string
  body?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[rgb(var(--line))] pb-5 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-strong))]">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[rgb(var(--text))] md:text-[1.95rem]">
            {title}
          </h2>
          {body ? (
            <p className="max-w-2xl text-sm leading-6 text-[rgb(var(--muted))] md:text-[0.98rem]">
              {body}
            </p>
          ) : null}
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export function TabButton({
  active,
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition',
        active
          ? 'border-[rgb(var(--accent))] bg-[rgb(var(--accent-soft))] text-[rgb(var(--accent-strong))]'
          : 'border-[rgb(var(--line))] bg-[rgb(var(--panel-strong))] text-[rgb(var(--muted))] hover:-translate-y-0.5 hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--text))]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function MetricCard({
  label,
  value,
  tone = 'neutral',
}: {
  label: string
  value: string
  tone?: 'neutral' | 'accent'
}) {
  return (
    <div
      className={clsx(
        'rounded-[22px] border px-4 py-4',
        tone === 'accent'
          ? 'border-[rgb(var(--accent-border))] bg-[rgb(var(--accent-soft))]'
          : 'border-[rgb(var(--line))] bg-[rgb(var(--panel-strong))]',
      )}
    >
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[rgb(var(--text))]">
        {value}
      </p>
    </div>
  )
}

export function EmptyState({
  title,
  body,
  icon,
}: {
  title: string
  body: string
  icon?: ReactNode
}) {
  return (
    <div className="rounded-[26px] border border-dashed border-[rgb(var(--line))] bg-[rgb(var(--panel-strong))] px-5 py-8 text-center">
      {icon ? (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(var(--accent-soft))] text-[rgb(var(--accent-strong))]">
          {icon}
        </div>
      ) : null}
      <h3 className="text-lg font-semibold text-[rgb(var(--text))]">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[rgb(var(--muted))]">
        {body}
      </p>
    </div>
  )
}
