// Since we're removing sidebar recommendations, let's make a video occupy full width
export const clearTheaterModeCookie = () => {
  document.cookie = "wide=; Max-Age=0; path=/; domain=.youtube.com"
}

export const enableTheaterMode = () => {
  clearTheaterModeCookie()

  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

  document.cookie = "wide=1; expires="+oneYearFromNow.toUTCString()+"; path=/; domain=.youtube.com"
}
