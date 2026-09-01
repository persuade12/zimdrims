import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
      <h1 className="font-display text-2xl font-black text-foreground">Module not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This ZIM-DRIMS module is not available in the current demo dataset.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        Return to Early Warning Centre
      </Link>
    </div>
  )
}
