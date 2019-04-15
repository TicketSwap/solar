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
  grid-auto-flow: row;

  @media ${device.mobile} {
    grid-auto-flow: column;
  }

  @supports (display: grid) {
    display: grid;
    grid-gap: ${space[8]};
    justify-items: center;
    margin: auto;
  }
`

const InputWrapper = styled.div`
  width: 100%;
`

const SelectWrapper = styled.div`
  width: 100%;
  padding: 0 ${space[8]};

  @supports (display: grid) {
    padding: 0;
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
  const { isMobile } = useDeviceInfo()
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
    <Container input={isMobile() ? 'native' : 'custom'}>
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
              id="day"
              label="Day"
              hideLabel
              placeholder="Day"
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
              id="year"
              label="Year"
              hideLabel
              placeholder="Year"
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
}

DateInput.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  months: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialSelectedDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
}
