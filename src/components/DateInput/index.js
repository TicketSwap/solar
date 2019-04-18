import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { space, device } from '../../theme'
import { Input } from '../Input'
import { Select } from '../Select'
import { useDeviceInfo } from '../../hooks'

const Container = styled.div`
  input[type='date'] {
    ${props =>
      props.input !== 'native' &&
      css`
        display: none;
      `};
  }

  .custom {
    ${props =>
      props.input !== 'custom' &&
      css`
        display: none;
      `};
  }
`

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  @media ${device.mobile} {
    flex-direction: row;
  }
`

const InputWrapper = styled.div`
  width: 100%;
  flex-shrink: 2;
  flex-basis: 40%;
`

const SelectWrapper = styled.div`
  width: 100%;
  padding: ${space[8]} 0;
  flex-shrink: 1;
  flex-basis: 60%;

  @media ${device.mobile} {
    padding: 0 ${space[8]};
  }
`

function pad(str) {
  if (str.length === 1) {
    return (str = '0' + str)
  }
  return str
}

function createDateString(date) {
  if (!date) return false
  let d = date
  if (typeof date.getMonth !== 'function') {
    d = new Date(date)
  }
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()
  month = pad(month)
  day = pad(day)
  return [year, month, day].join('-')
}

function createSelectOptions(months) {
  return months.map((name, i) => ({ value: i.toString(), name }))
}

function splitDateString(str) {
  if (!str) return ['', 1, '']
  return str.split('-')
}

export function DateInput({ id, label, hideLabel, ...props }) {
  const { isIOS } = useDeviceInfo()
  const dateInputRef = React.useRef()
  const months = createSelectOptions(props.months)
  const [initialYear, initialMonth, initialDay] = splitDateString(
    createDateString(props.initialSelectedDate)
  )
  const [year, setYear] = React.useState(initialYear || '')
  const [month, setMonth] = React.useState(initialMonth - 1 || 0)
  const [day, setDay] = React.useState(initialDay || '')

  React.useEffect(() => {
    props.onChange(dateInputRef.current.value)
  }, [year, month, day])

  return (
    <Container input={isIOS() ? 'native' : 'custom'}>
      <Input
        type="date"
        label={label}
        id={id}
        value={[year, pad((month + 1).toString()), pad(day).toString()].join(
          '-'
        )}
        onChange={e => {
          const [y, m, d] = splitDateString(e.target.value)
          setYear(y)
          setMonth(parseInt(m - 1))
          setDay(d)
        }}
        ref={dateInputRef}
      />
      <div className="custom">
        <InputGroup>
          <InputWrapper>
            <Input
              {...props.dayInputProps}
              id="day"
              hideLabel
              value={day.toString()}
              onChange={e => setDay(e.target.value)}
            />
          </InputWrapper>
          <SelectWrapper>
            <Select
              items={months}
              id="month"
              label="Month"
              hideLabel
              selectedItem={months[month]}
              onChange={selection => setMonth(parseInt(selection.value))}
            />
          </SelectWrapper>
          <InputWrapper>
            <Input
              {...props.yearInputProps}
              id="year"
              hideLabel
              value={year.toString()}
              onChange={e =>
                e.target.value.length < 5 && setYear(e.target.value)
              }
            />
          </InputWrapper>
        </InputGroup>
      </div>
    </Container>
  )
}

DateInput.defaultProps = {
  onChange: () => {},
  dayInputProps: {
    label: 'Day',
    placeholder: 'Day',
  },
  yearInputProps: {
    label: 'Year',
    placeholder: 'Year',
  },
}

DateInput.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  dayInputProps: PropTypes.object,
  yearInputProps: PropTypes.object,
  months: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialSelectedDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
}
