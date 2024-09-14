export const getTime = () => {
  return Math.floor(new Date().getTime() / 1000)
}

export const timeDiffInDays = (from, to) => {
  return (to - from) / 60 / 60 / 24
}
