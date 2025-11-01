import { padNumber } from "."

export function formatDate(date: Date) {
  if (!isValidDate(date)) {
    return
  }

  return [
    date.getFullYear(),
    padNumber(date.getMonth() + 1),
    padNumber(date.getDate())
  ].join('-')
}

export function parseDate(datestring?: string) {
  if (!datestring) {
    return
  }

  const date = new Date(datestring)

  return isValidDate(date) ? date : undefined
}

export function isValidDate(date: Date) {
  return !isNaN(date.getDate())
}

export function copyDate(date: Date) {
  return new Date(date.getTime())
}

// Получает первый день недели с учётом локали
export function getStartOfWeek(locale: string | undefined) {
  if (!locale) {
    return 1
  }

  try {
    const localeInfo = new Intl.Locale(locale)

    // @ts-expect-error метод поддерживается всеми, кроме Firefox
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo
    return localeInfo.getWeekInfo().firstDay
  } catch {
    return 1
  }
}

export function getDaysInMonth(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return new Date(year, month, 0).getDate()
}

export function getDateParts(sourceDate: Date) {
  const date = copyDate(sourceDate)

  date.setHours(12, 0, 0, 0)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return { day, month, year }
}

export function isSameDay(dateA: Date, dateB?: Date) {
  const { day, month, year } = getDateParts(dateA)
  const compareTo = getDateParts(dateB ?? new Date())

  return day === compareTo.day && month === compareTo.month && year === compareTo.year
}
