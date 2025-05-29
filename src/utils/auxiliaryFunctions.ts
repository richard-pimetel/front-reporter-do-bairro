

export function extrairCEP(displayName: string): string | null {
    const regex = /\b\d{5}-\d{3}\b/
    const match = displayName.match(regex)
    return match ? match[0] : null
  }
  