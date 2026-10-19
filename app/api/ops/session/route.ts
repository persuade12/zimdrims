import { NextResponse } from 'next/server'
import { readSession } from '@/lib/zimdrims/guard'

export async function GET() {
  const session = await readSession()
  if (!session) return NextResponse.json({ authenticated: false })
  return NextResponse.json({
    authenticated: true,
    username: session.username,
    displayName: session.displayName,
    role: session.role,
    userId: session.userId ?? null,
    isAdmin: session.isAdmin === true,
  })
}
