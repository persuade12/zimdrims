import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="rounded-xl border border-border bg-card p-8 text-center">
      <h1 className="font-display text-2xl font-extrabold">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">This DARE/Inkundla module is not available in the dummy dataset.</p>
      <Link href="/" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
        Back to home
      </Link>
    </div>
  )
}
