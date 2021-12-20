import React from 'react'
import { useState } from 'react'
import styled from '@emotion/styled'
import {
  Dialog,
  DialogAdornment,
  DialogBody,
  DialogHeader,
  DialogWindow,
} from '../Dialog'
import { Select } from '../Select'
import { Text } from '../Text'
import { H6 } from '../Heading'
import { CloseAlt } from '../../icons'
import { space, color, device } from '../../theme'
import Day from './Day'
import {
  TimeFrame,
  isSameDate,
  getWeekdays,
  getMonths,
  getYears,
  isPastDate,
  isFutureDate,
  withTimezone,
} from '../../utils/dates'

const Selects = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${space[8]};
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: ${space[4]};
`

const CalendarTitles = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: ${space[4]};
  margin-top: ${space[24]};
  margin-bottom: ${space[8]};
`

const CalendarTitle = styled(H6)`
  text-align: center;
`

const InfoText = styled(Text)`
  margin-top: ${space[16]};
  color: ${color.spaceMedium};
`

const StyledDialogBody = styled(DialogBody)`
  max-height: 70vh;

  @media ${device.mobileL} {
    max-height: none;
  }
`

interface CalendarDialogProps {
  date: Date | null
  title?: string
  timeFrame?: TimeFrame
  monthLabel: string
  yearLabel: string
  info?: string
  isOpen: boolean
  locale: string
  timeZone: string
  close: () => void
  onChange: (date: Date) => void
}

const CalendarDialog = ({
  date,
  title,
  timeFrame,
  monthLabel,
  yearLabel,
  info,
  isOpen,
  close,
  locale,
  timeZone,
  onChange,
}: CalendarDialogProps) => {
  const initialDate = date || new Date()

  const month = withTimezone(initialDate, timeZone, locale).getMonth()
  const year = withTimezone(initialDate, timeZone, locale).getFullYear()

  const [selectedMonth, setSelectedMonth] = useState(month)
  const [selectedYear, setSelectedYear] = useState(year)

  const daysInMonth = withTimezone(
    new Date(selectedYear, selectedMonth + 1, 0),
    timeZone,
    locale
  ).getDate()

  const firstDayOfMonth = withTimezone(
    new Date(selectedYear, selectedMonth, 1),
    timeZone,
    locale
  ).getDay()

  const weekdays = getWeekdays(locale)
  const months = getMonths(locale)
  const years = getYears(timeFrame)

  const days: Array<React.ReactNode> = []

  for (let i = 1; i < daysInMonth + 1; i++) {
    const day = withTimezone(
      new Date(selectedYear, selectedMonth, i),
      timeZone,
      locale
    )
    const isDisabled =
      (timeFrame === TimeFrame.future && isPastDate(day, timeZone, locale)) ||
      (timeFrame === TimeFrame.past && isFutureDate(day, timeZone, locale))

    days.push(
      <Day
        key={i}
        date={day}
        isDisabled={isDisabled}
        isSelected={!!date && isSameDate(date, day)}
        onSelect={onChange}
      />
    )
  }

  for (let i = 1; i < firstDayOfMonth; i++) {
    days.unshift(<div key={`prev-${i}`} />)
  }

  return (
    <Dialog on={isOpen}>
      {({ getWindowProps }) => (
        <DialogWindow
          {...getWindowProps({
            onClick: close,
            onEscKeyDown: close,
          })}
        >
          <DialogHeader>
            {title}
            <DialogAdornment right>
              <button onClick={close}>
                <CloseAlt size={24} />
              </button>
            </DialogAdornment>
          </DialogHeader>
          <StyledDialogBody>
            <Selects>
              <Select
                id="month"
                items={months}
                label={monthLabel}
                initialSelectedItem={months.find(
                  i => i.value === String(month)
                )}
                hideLabel
                onChange={selected => setSelectedMonth(Number(selected.value))}
              />
              <Select
                id="year"
                items={years}
                label={yearLabel}
                initialSelectedItem={years.find(i => i.value === String(year))}
                hideLabel
                onChange={selected => setSelectedYear(Number(selected.value))}
              />
            </Selects>
            <CalendarTitles>
              {weekdays.map((weekday, index) => (
                <CalendarTitle key={`day-${index}`}>{weekday}</CalendarTitle>
              ))}
            </CalendarTitles>
            <CalendarGrid>{days}</CalendarGrid>
            {info && <InfoText as="p">{info}</InfoText>}
          </StyledDialogBody>
        </DialogWindow>
      )}
    </Dialog>
  )
}

export default CalendarDialog
