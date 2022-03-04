export enum TimeFrame {
  all = 'all',
  past = 'past',
  future = 'future',
  custom = 'custom',
}

const dateWithoutHours = (date: Date) => date.setHours(0, 0, 0, 0)

const isSameDate = (dateOne: Date, dateTwo: Date) =>
  dateWithoutHours(dateOne) === dateWithoutHours(dateTwo)
const isPastDate = (date: Date, dateOfReference: Date = new Date()) =>
  dateWithoutHours(date) - dateWithoutHours(dateOfReference) < 0
const isFutureDate = (date: Date, dateOfReference: Date = new Date()) =>
  dateWithoutHours(date) - dateWithoutHours(dateOfReference) > 0

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

const getMonths = (locale: string, dateRange?: { start: Date; end: Date }) => {
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

  if (dateRange) {
    return months.filter(
      month =>
        Number(month.value) >= dateRange.start.getMonth() &&
        Number(month.value) <= dateRange.end.getMonth()
    )
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

interface YearParams {
  timeFrame: TimeFrame
  range: number
  yearOfReference: number
}

const getYears = ({ timeFrame, range, yearOfReference }: YearParams) => {
  if (timeFrame === TimeFrame.all) {
    return generateYears(yearOfReference - range, yearOfReference + range)
  }

  if (timeFrame === TimeFrame.past) {
    return generateYears(yearOfReference - range, yearOfReference)
  }

  if (timeFrame === TimeFrame.custom) {
    return generateYears(yearOfReference, yearOfReference + range)
  }

  return generateYears(yearOfReference, yearOfReference + range)
}

export {
  isSameDate,
  isPastDate,
  isFutureDate,
  getWeekdays,
  getMonths,
  getYears,
}
