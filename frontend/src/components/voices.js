const PREFERRED = {
  "en-US": ["Zira"],
  "hi-IN": ["स्वरा", "मधुर"],
  "mr-IN": ["आरोही", "मनोहर"],
}

// If a language has no voice at all, borrow a related one
const FALLBACK_LANG = { "mr-IN": "hi-IN" }

export function pickVoice(lang) {
  const voices = window.speechSynthesis.getVoices()

  for (const name of PREFERRED[lang] || []) {
    const hit = voices.find(v => v.lang === lang && v.name.includes(name))
    if (hit) return hit
  }

  const exact = voices.find(v => v.lang === lang)
  if (exact) return exact

  const fallback = FALLBACK_LANG[lang]
  if (fallback && fallback !== lang) return pickVoice(fallback)

  return voices.find(v => v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()))
}