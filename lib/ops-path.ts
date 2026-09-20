/** Prefix an ops-relative path with `/ops`. Public site paths must not use this. */
export function opsPath(path = '/'): string {
  if (!path || path === '/') return '/ops'
  if (path.startsWith('/ops')) return path
  return path.startsWith('/') ? `/ops${path}` : `/ops/${path}`
}
