'use client'

import { useEffect, useState } from 'react'

export type ClientSession = {
  status: 'loading' | 'anonymous' | 'ready'
  displayName: string
  role: string
  username: string
  isAdmin: boolean
  userId: number | null
}

const empty: ClientSession = {
  status: 'loading',
  displayName: '',
  role: '',
  username: '',
  isAdmin: false,
  userId: null,
}

export function useOpsSession(): ClientSession {
  const [session, setSession] = useState<ClientSession>(empty)

  useEffect(() => {
    let cancelled = false
    fetch('/api/ops/session')
      .then(async (response) => response.json())
      .then((data: { authenticated?: boolean; displayName?: string; role?: string; username?: string; isAdmin?: boolean; userId?: number | null }) => {
        if (cancelled) return
        if (!data.authenticated) {
          setSession({ ...empty, status: 'anonymous' })
          return
        }
        setSession({
          status: 'ready',
          displayName: data.displayName ?? '',
          role: data.role ?? '',
          username: data.username ?? '',
          isAdmin: data.isAdmin === true,
          userId: typeof data.userId === 'number' ? data.userId : null,
        })
      })
      .catch(() => {
        if (!cancelled) setSession({ ...empty, status: 'anonymous' })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return session
}
