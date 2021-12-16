import React from 'react'
import { useState } from 'react'
import styled from '@emotion/styled'
import { Text } from '../Text'
import { Calendar } from '../../icons'
import { space, radius, color } from '../../theme'
import CalendarDialog from './CalendarDialog'
import { TimeFrame } from '../../utils/dates'

interface ButtonTextProps {
  hasDate: boolean
}

interface DatePickerProps {
  date?: Date | null
  placeholder: string
  title?: string
  timeFrame?: TimeFrame
  info?: string
  monthLabel: string
  yearLabel: string
  locale?: string
  onChange: (date: Date) => void
}

const StyledButton = styled.button`
  padding: ${space[16]};
  border-radius: ${radius.md};
  background-color: ${color.stardust};
  color: ${color.spaceLight};
  font-family: inherit;
  display: flex;
  align-items: center;
  margin-bottom: ${space[8]};
  width: 100%;
`

const ButtonText = styled(Text)<ButtonTextProps>`
  margin-left: ${space[16]};
  color: ${props => (props.hasDate ? color.space : color.spaceLight)};
`

export const DatePicker = ({
  date = null,
  placeholder,
  title,
  timeFrame = TimeFrame.future,
  info,
  monthLabel,
  yearLabel,
  locale = 'en-US',
  onChange,
}: DatePickerProps) => {
  const [isOpen, setOpen] = useState(false)

  const close = () => setOpen(false)
  const toggle = () => setOpen(open => !open)

  return (
    <>
      <CalendarDialog
        date={date}
        title={title}
        timeFrame={timeFrame}
        info={info}
        monthLabel={monthLabel}
        yearLabel={yearLabel}
        locale={locale}
        isOpen={isOpen}
        close={close}
        onChange={(date: Date) => {
          onChange(date)
          close()
        }}
      />
      <StyledButton onClick={toggle}>
        <Calendar size={24} color={color.spaceMedium} />
        <ButtonText hasDate={!!date}>
          {!!date
            ? date.toLocaleString(locale, {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
            : placeholder}
        </ButtonText>
      </StyledButton>
    </>
  )
}

export { TimeFrame }
