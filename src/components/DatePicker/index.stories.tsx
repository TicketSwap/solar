import React, { useState } from 'react'
import { DatePicker, TimeFrame } from '.'
import { Calendar } from '../../icons'

export default {
  title: 'Components/Inputs/DatePicker',
}

export const Simple = () => {
  const [date, setDate] = useState(null)

  return (
    <DatePicker
      date={date}
      monthLabel="Month"
      yearLabel="Year"
      placeholder="Pick a date"
      leftAdornment={<Calendar size={24} />}
      onChange={date => setDate(date)}
    />
  )
}

Simple.storyName = 'Without initial date'

export const NoLeftAdornment = () => {
  const [date, setDate] = useState(null)

  return (
    <DatePicker
      date={date}
      monthLabel="Month"
      yearLabel="Year"
      placeholder="Pick a date"
      onChange={date => setDate(date)}
    />
  )
}

NoLeftAdornment.storyName = 'With no left adornment'

export const InitialDate = () => {
  const [date, setDate] = useState(new Date())

  return (
    <DatePicker
      date={date}
      monthLabel="Month"
      yearLabel="Year"
      placeholder="Pick a date"
      leftAdornment={<Calendar size={24} />}
      onChange={date => setDate(date)}
    />
  )
}

InitialDate.storyName = 'With initial date'

export const Future = () => {
  const [date, setDate] = useState(null)

  return (
    <DatePicker
      date={date}
      monthLabel="Month"
      yearLabel="Year"
      placeholder="Pick a date"
      leftAdornment={<Calendar size={24} />}
      onChange={date => setDate(date)}
    />
  )
}

Future.storyName = 'Future dates'

export const Past = () => {
  const [date, setDate] = useState(null)

  return (
    <DatePicker
      date={date}
      timeFrame={TimeFrame.past}
      monthLabel="Month"
      yearLabel="Year"
      placeholder="Pick a date"
      leftAdornment={<Calendar size={24} />}
      onChange={date => setDate(date)}
    />
  )
}

Past.storyName = 'Past dates'

export const All = () => {
  const [date, setDate] = useState(null)

  return (
    <DatePicker
      date={date}
      timeFrame={TimeFrame.all}
      monthLabel="Month"
      yearLabel="Year"
      placeholder="Pick a date"
      leftAdornment={<Calendar size={24} />}
      onChange={date => setDate(date)}
    />
  )
}

All.storyName = 'All dates'

export const WithTimeRange = () => {
  const [date, setDate] = useState(null)

  return (
    <DatePicker
      date={date}
      timeFrame={TimeFrame.custom}
      dateRange={{
        start: new Date(2023, 2, 12),
        end: new Date(2023, 4, 20),
      }}
      monthLabel="Month"
      yearLabel="Year"
      placeholder="Pick a date"
      leftAdornment={<Calendar size={24} />}
      onChange={date => setDate(date)}
    />
  )
}

WithTimeRange.storyName = 'With a time range'

export const WithTitle = () => {
  const [date, setDate] = useState(null)

  return (
    <DatePicker
      date={date}
      title="Pick a date"
      monthLabel="Month"
      yearLabel="Year"
      placeholder="Pick a date"
      leftAdornment={<Calendar size={24} />}
      onChange={date => setDate(date)}
    />
  )
}

WithTitle.storyName = 'With title'

export const WithResetButton = () => {
  const [date, setDate] = useState(null)

  return (
    <DatePicker
      date={date}
      title="Pick a date"
      monthLabel="Month"
      yearLabel="Year"
      placeholder="Pick a date"
      leftAdornment={<Calendar size={24} />}
      onChange={date => setDate(date)}
      onReset={() => setDate(null)}
    />
  )
}

WithResetButton.storyName = 'With reset button'

export const WithInfo = () => {
  const [date, setDate] = useState(null)

  return (
    <DatePicker
      date={date}
      info="Some extra info goes here"
      monthLabel="Month"
      yearLabel="Year"
      placeholder="Pick a date"
      leftAdornment={<Calendar size={24} />}
      onChange={date => setDate(date)}
    />
  )
}

WithInfo.storyName = 'With info'
