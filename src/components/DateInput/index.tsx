import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { space, device } from '../../theme'
import { Input } from '../Input'
import { Select } from '../Select'
import { useDeviceInfo } from '../../hooks'
import { usePrevious } from '../../hooks'
import { useId } from '@reach/auto-id'

export interface DateProp {
  label: string
  placeholder: string
}

export interface DateInputProps {
  onChange?: (value?: any) => void
  id: string
  label: string
  dayInputProps?: DateProp
  yearInputProps?: DateProp
  months: string[]
  initialSelectedDate?: string | Date
}

interface StyledContainerProps {
  input: 'native' | 'custom'
}

const Container = styled.div<StyledContainerProps>`
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
  padding-block: ${space[8]};
  padding-inline: 0;
  flex-shrink: 1;
  flex-basis: 60%;

  @media ${device.mobile} {
    padding-block: 0;
    padding-inline: ${space[8]};
  }
`

function pad(str: string) {
  if (str.length === 1) {
    return '0' + str
  }
  return str
}

function createSelectOptions(months: string[]) {
  return months.map((name, i) => ({ value: i.toString(), name }))
}

function splitDateString(str: string) {
  if (!str) return ['', '', '']
  return str.split('-')
}

function getDate(input?: Date | string) {
  if (input) {
    if (typeof input === 'string') {
      const [year, month, day] = input.split(/[^0-9]/)
      return [parseInt(year), parseInt(month) - 1, parseInt(day)]
    }
    if (typeof input === 'object') {
      return [input.getFullYear(), input.getMonth(), input.getDate()]
    }
  }

  return [null, null, null]
}

export const DateInput: React.FC<DateInputProps> = ({ id, label, onChange, ...props }) => {
  const { isIOS } = useDeviceInfo()
  const dateInputRef = React.useRef<HTMLInputElement>(null)
  const months = createSelectOptions(props.months)
  const [initialYear, initialMonth, initialDay] = getDate(props.initialSelectedDate)

  const [year, setYear] = React.useState(initialYear || '')
  const [month, setMonth] = React.useState(initialMonth || 0)
  const [day, setDay] = React.useState(initialDay || '')
  const previousValue = usePrevious(dateInputRef.current && dateInputRef.current.value)
  const inputId = `date-input-${useId()}`

  React.useEffect(() => {
    if (
      typeof previousValue !== 'undefined' &&
      dateInputRef.current &&
      previousValue !== dateInputRef.current.value
    ) {
      if (onChange) {
        onChange(dateInputRef.current.value)
      }
    }
  }, [year, month, day, onChange, previousValue])

  return (
    <Container input={isIOS() ? 'native' : 'custom'} {...props}>
      <Input
        type="date"
        label={label}
        id={id}
        value={[year, pad((month + 1).toString()), pad(day.toString())].join('-')}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const [y, m, d] = splitDateString(event.target.value)
          setYear(y)
          setMonth(parseInt(m) - 1)
          setDay(d)
        }}
        ref={dateInputRef}
      />
      <div className="custom">
        <InputGroup>
          <InputWrapper>
            <Input
              label={props.dayInputProps ? props.dayInputProps.label : `${label}-day`}
              placeholder={props.dayInputProps && props.dayInputProps.label}
              id={`${inputId}-day`}
              hideLabel
              value={day ? day : ''}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const d = parseInt(event.target.value)
                setDay(d ? '' + d : '')
              }}
            />
          </InputWrapper>
          <SelectWrapper>
            <Select
              items={months}
              id={`${inputId}-month`}
              label="Month"
              hideLabel
              selectedItem={months[month]}
              onChange={selection => setMonth(parseInt(selection.value))}
            />
          </SelectWrapper>
          <InputWrapper>
            <Input
              label={props.yearInputProps ? props.yearInputProps.label : `${label}-year`}
              placeholder={props.yearInputProps && props.yearInputProps.label}
              id={`${inputId}-year`}
              hideLabel
              value={year.toString()}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.value.length >= 5) return
                const y = parseInt(event.target.value)
                setYear(y ? '' + y : '')
              }}
            />
          </InputWrapper>
        </InputGroup>
      </div>
    </Container>
  )
}
