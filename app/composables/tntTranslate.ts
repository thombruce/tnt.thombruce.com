const { $i18n: { t: translate } } = useNuxtApp()

// tntTranslate return values:
// 1. $t(key) : an i18n translation if the key is found in the definitions
// 2. fallback : optional user provided string
// 3. undefined : _
export const tntTranslate = (key: string, fallback?: string): string | undefined => {
  if (translate(key) !== key) {
    return translate(key)
  } else if (fallback) {
    return fallback
  } else return
}
