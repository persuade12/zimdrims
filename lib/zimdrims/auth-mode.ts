export type ZimdrimsAuthMode = 'demo' | 'live'

export function zimdrimsApiBaseUrl(): string {
  const configured = process.env.ZIMDRIMS_API_BASE_URL?.trim()
  return (configured || 'https://dcp.dikarabo.co.za').replace(/\/$/, '')
}

/** Live login is the default. Set ZIMDRIMS_AUTH_MODE=demo for the local sample accounts. */
export function zimdrimsAuthMode(): ZimdrimsAuthMode {
  return process.env.ZIMDRIMS_AUTH_MODE?.trim().toLowerCase() === 'demo' ? 'demo' : 'live'
}
