import {
  isSameDate,
  isPastDate,
  getWeekdays,
  getMonths,
  getYears,
  TimeFrame,
} from '.'

describe('dates', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(Date.parse('2020-01-01T00:00:00Z'))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe('isSameDate', () => {
    describe('when dates are the same', () => {
      it('returns true', () => {
        const dateOne = new Date(2020, 1, 1)
        const dateTwo = new Date(2020, 1, 1)

        const result = isSameDate(dateOne, dateTwo)

        expect(result).toBe(true)
      })
    })

    describe('when dates are not the same', () => {
      it('returns false', () => {
        const dateOne = new Date(2020, 1, 1)
        const dateTwo = new Date(2020, 1, 2)

        const result = isSameDate(dateOne, dateTwo)

        expect(result).toBe(false)
      })
    })
  })

  describe('isPastDate', () => {
    describe('when the date is in the past', () => {
      it('returns true', () => {
        const date = new Date(2000, 1, 1)

        const result = isPastDate(date)

        expect(result).toBe(true)
      })
    })

    describe('when the date is not in the past', () => {
      it('returns false', () => {
        const date = new Date(2050, 1, 1)

        const result = isPastDate(date)

        expect(result).toBe(false)
      })
    })
  })

  describe('getWeekdays', () => {
    it('returns the weekdays', () => {
      const result = getWeekdays('en-EN')

      expect(result).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
    })

    describe('when provided with different "BCP 47" locale tags', () => {
      it('translates them correctly', () => {
        const nl_weekdays = getWeekdays('nl-NL')
        const sv_weekdays = getWeekdays('sv-SE')
        const fr_weekdays = getWeekdays('fr-FR')
        const de_weekdays = getWeekdays('de-DE')
        const hu_weekdays = getWeekdays('hu-HU')
        const es_weekdays = getWeekdays('es-ES')
        const pt_br_weekdays = getWeekdays('pt-BR')

        expect(nl_weekdays).toEqual(expect.arrayContaining(['ma', 'zo']))
        expect(sv_weekdays).toEqual(expect.arrayContaining(['mån', 'sön']))
        expect(fr_weekdays).toEqual(expect.arrayContaining(['lun.', 'dim.']))
        expect(de_weekdays).toEqual(expect.arrayContaining(['Mo', 'So']))
        expect(hu_weekdays).toEqual(expect.arrayContaining(['H', 'V']))
        expect(es_weekdays).toEqual(expect.arrayContaining(['lun', 'dom']))
        expect(pt_br_weekdays).toEqual(expect.arrayContaining(['seg.', 'dom.']))
      })
    })
  })

  describe('getMonths', () => {
    it('returns the months', () => {
      const result = getMonths('en-EN')

      expect(result).toEqual([
        {
          name: 'January',
          value: '0',
        },
        {
          name: 'February',
          value: '1',
        },
        {
          name: 'March',
          value: '2',
        },
        {
          name: 'April',
          value: '3',
        },
        {
          name: 'May',
          value: '4',
        },
        {
          name: 'June',
          value: '5',
        },
        {
          name: 'July',
          value: '6',
        },
        {
          name: 'August',
          value: '7',
        },
        {
          name: 'September',
          value: '8',
        },
        {
          name: 'October',
          value: '9',
        },
        {
          name: 'November',
          value: '10',
        },
        {
          name: 'December',
          value: '11',
        },
      ])
    })

    it('returns only the months within a timeRange', () => {
      const monthsOfTimeRange = getMonths('en-EN', {
        start: new Date('02-12-2023'),
        end: new Date('04-20-2023'),
      })
      expect(monthsOfTimeRange).toHaveLength(3)
      expect(monthsOfTimeRange).toEqual(
        expect.arrayContaining([
          {
            name: 'February',
            value: '1',
          },
          {
            name: 'March',
            value: '2',
          },
          {
            name: 'April',
            value: '3',
          },
        ])
      )
    })

    describe('when provided with different "BCP 47" locale tags', () => {
      it('translates them correctly', () => {
        const nl_months = getMonths('nl-NL')
        const sv_months = getMonths('sv-SE')
        const fr_months = getMonths('fr-FR')
        const de_months = getMonths('de-DE')
        const hu_months = getMonths('hu-HU')
        const es_months = getMonths('es-ES')
        const pt_br_months = getMonths('pt-BR')

        expect(nl_months).toEqual(
          expect.arrayContaining([
            { name: 'januari', value: '0' },
            { name: 'december', value: '11' },
          ])
        )
        expect(sv_months).toEqual(
          expect.arrayContaining([
            { name: 'januari', value: '0' },
            { name: 'december', value: '11' },
          ])
        )
        expect(fr_months).toEqual(
          expect.arrayContaining([
            { name: 'janvier', value: '0' },
            { name: 'décembre', value: '11' },
          ])
        )
        expect(de_months).toEqual(
          expect.arrayContaining([
            { name: 'Januar', value: '0' },
            { name: 'Dezember', value: '11' },
          ])
        )
        expect(hu_months).toEqual(
          expect.arrayContaining([
            { name: 'január', value: '0' },
            { name: 'december', value: '11' },
          ])
        )
        expect(es_months).toEqual(
          expect.arrayContaining([
            { name: 'enero', value: '0' },
            { name: 'diciembre', value: '11' },
          ])
        )
        expect(pt_br_months).toEqual(
          expect.arrayContaining([
            { name: 'janeiro', value: '0' },
            { name: 'dezembro', value: '11' },
          ])
        )
      })
    })
  })

  describe('getYears', () => {
    describe('when the timeFrame is "all"', () => {
      it('includes past and future years', () => {
        const years = getYears({
          timeFrame: TimeFrame.all,
          range: 1,
          yearOfReference: new Date().getFullYear(),
        })

        expect(years).toEqual([
          {
            name: '2019',
            value: '2019',
          },
          {
            name: '2020',
            value: '2020',
          },
          {
            name: '2021',
            value: '2021',
          },
        ])
      })
    })
  })

  describe('when the timeFrame is "past"', () => {
    it('includes past years', () => {
      const years = getYears({
        timeFrame: TimeFrame.past,
        range: 1,
        yearOfReference: new Date().getFullYear(),
      })

      expect(years).toEqual([
        {
          name: '2019',
          value: '2019',
        },
        {
          name: '2020',
          value: '2020',
        },
      ])
    })
  })

  describe('when the timeFrame is "future"', () => {
    it('includes future years', () => {
      const years = getYears({
        timeFrame: TimeFrame.future,
        range: 1,
        yearOfReference: new Date().getFullYear(),
      })

      expect(years).toEqual([
        {
          name: '2020',
          value: '2020',
        },
        {
          name: '2021',
          value: '2021',
        },
      ])
    })
  })

  describe('when the timeFrame is all and the range default to 10', () => {
    it('displays a range of 20 years (10y before and after current year)', () => {
      const years = getYears({
        timeFrame: TimeFrame.all,
        range: 10,
        yearOfReference: new Date().getFullYear(),
      })

      expect(years).toHaveLength(21)
    })
  })

  describe('when the timeFrame is custom', () => {
    it('displays the years within date range', () => {
      const dateRange = {
        start: new Date('02-12-2023'),
        end: new Date('04-20-2024'),
      }
      const years = getYears({
        timeFrame: TimeFrame.custom,
        range: dateRange.end.getFullYear() - dateRange.start.getFullYear(),
        yearOfReference: dateRange.start.getFullYear(),
      })

      expect(years).toHaveLength(2)
    })
  })
})
