/**
 * Sets a cookie with appropriate SameSite attributes
 */
export function setCookie(name: string, value: string, days = 7) {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `; expires=${date.toUTCString()}`

  // Use SameSite=Lax by default instead of None to avoid third-party cookie issues
  document.cookie = `${name}=${value}${expires}; path=/; SameSite=Lax`
}

/**
 * Gets a cookie by name
 */
export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(";")

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }

  return null
}

/**
 * Deletes a cookie by name
 */
export function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=Lax`
}
