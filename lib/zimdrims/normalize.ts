/** Collapse the shapes Express may return after SQL JSON reassembly. */
export function normalizeJson(data: unknown): unknown {
  if (typeof data === 'string') {
    const trimmed = data.trim()
    if (!trimmed) return null
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        return normalizeJson(JSON.parse(trimmed))
      } catch {
        return data
      }
    }
    return data
  }

  if (Array.isArray(data)) {
    if (data.length === 1) {
      const only = data[0]
      if (typeof only === 'string') return normalizeJson(only)
      if (isRecord(only)) {
        const values = Object.values(only)
        if (values.length === 1 && typeof values[0] === 'string') {
          const parsed = normalizeJson(values[0])
          if (parsed !== values[0]) return parsed
        }
      }
    }
    return data
  }

  if (isRecord(data)) {
    for (const key of ['data', 'recordset', 'result', 'json', 'JSON']) {
      if (key in data) return normalizeJson(data[key])
    }
  }

  return data
}

export function asList(data: unknown): unknown[] {
  const normalized = normalizeJson(data)
  if (Array.isArray(normalized)) return normalized
  if (isRecord(normalized)) return [normalized]
  return []
}

export function asRecord(data: unknown): Record<string, unknown> | null {
  const normalized = normalizeJson(data)
  if (isRecord(normalized)) return normalized
  if (Array.isArray(normalized) && isRecord(normalized[0])) return normalized[0]
  return null
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}
