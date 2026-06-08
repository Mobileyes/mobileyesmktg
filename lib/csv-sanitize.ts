/**
 * CSV Sanitization
 * 
 * Prevents CSV formula injection (DDE attacks) by escaping
 * cell values that start with characters that spreadsheet
 * applications interpret as formulas.
 * 
 * Dangerous prefixes: = + - @ | %
 * Reference: OWASP CSV Injection
 */

const FORMULA_PREFIXES = ['=', '+', '-', '@', '|', '%']

/**
 * Sanitize a single CSV cell value to prevent formula injection.
 * Prefixes dangerous characters with a single quote.
 */
export function sanitizeCsvCell(value: string | null | undefined): string {
  if (!value) return ''
  const trimmed = value.trim()
  if (trimmed.length === 0) return ''

  // If starts with a dangerous character, prefix with single quote
  if (FORMULA_PREFIXES.some((prefix) => trimmed.startsWith(prefix))) {
    return `'${trimmed}`
  }

  return trimmed
}

/**
 * Sanitize and properly quote a CSV cell value.
 * Handles commas, newlines, and double quotes within values.
 */
export function quoteCsvCell(value: string | null | undefined): string {
  const sanitized = sanitizeCsvCell(value)
  if (!sanitized) return ''

  // Quote if contains comma, newline, or double quote
  if (sanitized.includes(',') || sanitized.includes('\n') || sanitized.includes('"')) {
    return `"${sanitized.replace(/"/g, '""')}"`
  }

  return sanitized
}

/**
 * Build a CSV row from values, sanitizing each cell.
 */
export function buildCsvRow(values: (string | number | null | undefined)[]): string {
  return values
    .map((v) => {
      if (v === null || v === undefined) return ''
      if (typeof v === 'number') return String(v)
      return quoteCsvCell(v)
    })
    .join(',')
}
