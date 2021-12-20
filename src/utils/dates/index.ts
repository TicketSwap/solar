export enum TimeFrame {
  all = 'all',
  past = 'past',
  future = 'future',
}

const dateWithoutHours = (date: Date) => date.setHours(0, 0, 0, 0)
const withTimezone = (date: Date, timeZone: string, locale: string) =>
  new Date(date.toLocaleString(locale, { timeZone }))

const isSameDate = (dateOne: Date, dateTwo: Date) =>
  dateWithoutHours(dateOne) === dateWithoutHours(dateTwo)
const isPastDate = (date: Date, timeZone: string, locale: string) =>
  dateWithoutHours(date) -
    dateWithoutHours(withTimezone(new Date(), timeZone, locale)) <
  0
const isFutureDate = (date: Date, timeZone: string, locale: string) =>
  dateWithoutHours(date) - dateWithoutHours(new Date()) > 0

const getWeekdays = (locale: string) => {
  const weekdays = []

  for (let i = 0; i < 7; i++) {
    const weekday = new Date(2021, 5, i).toLocaleString(locale, {
      weekday: 'short',
    })

    weekdays.push(weekday)
  }

  return weekdays
}

const getMonths = (locale: string) => {
  const months = []

  for (let i = 0; i < 12; i++) {
    const month = new Date(2021, i, 1).toLocaleString(locale, {
      month: 'long',
    })

    months.push({
      name: String(month),
      value: String(i),
    })
  }

  return months
}

const generateYears = (startYear: number, endYear: number) => {
  let years = []

  while (startYear <= endYear) {
    years.push({
      value: String(startYear),
      name: String(startYear),
    })

    startYear++
  }

  return years
}

const getYears = (
  timeFrame: TimeFrame = TimeFrame.future,
  range: number = 10
) => {
  const currentYear = new Date().getFullYear()

  if (timeFrame === TimeFrame.all) {
    return generateYears(currentYear - range, currentYear + range)
  }

  if (timeFrame === TimeFrame.past) {
    return generateYears(currentYear - range, currentYear)
  }

  return generateYears(currentYear, currentYear + range)
}

export {
  withTimezone,
  isSameDate,
  isPastDate,
  isFutureDate,
  getWeekdays,
  getMonths,
  getYears,
}
