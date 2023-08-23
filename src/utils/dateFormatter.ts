export function hoursMinutesToString(date: Date): string{
  // return `${date.getHours()}:${date.getMinutes()}`
  const str = date.toLocaleTimeString();
  return str.slice(0, str.length - 3)
}

export function hoursMinutesSecondsToString(date: Date): string{
  return date.toLocaleTimeString()
}

export function dateToString(date: Date): string{
  return date.toLocaleDateString()
}

export function dateTimeToString(date: Date): string{
  return date.toLocaleString()
}