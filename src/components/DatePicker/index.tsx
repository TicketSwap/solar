import React from 'react'
import { useState } from 'react'
import styled from '@emotion/styled'
import { Text } from '../Text'
import { Calendar, CloseRounded } from '../../icons'
import { space, radius, color, device, transition } from '../../theme'
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
  dateRange?: { start: Date; end: Date }
  info?: string
  monthLabel: string
  yearLabel: string
  locale?: string
  onChange: (date: Date) => void
  onReset?: () => void
}

const StyledButton = styled.button`
  padding: ${space[16]};
  border-radius: ${radius.md};
  background-color: ${color.stardust};
  color: ${color.spaceLight};
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${space[8]};
  width: 100%;
`

const ButtonText = styled(Text)<ButtonTextProps>`
  color: ${props => (props.hasDate ? color.space : color.spaceLight)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media ${device.mobileM} {
    margin-left: ${space[16]};
  }
`

const StyledCalendar = styled(Calendar)`
  display: none;

  @media ${device.mobileM} {
    display: inline-block;
  }
`

const ResetButton = styled.button`
  line-height: 0;
  opacity: 0.35;
  transition: opacity ${transition};

  &:hover,
  &:focus {
    opacity: 0.5;
    outline: 0;
  }
`

export const DatePicker = ({
  date = null,
  placeholder,
  title,
  timeFrame = TimeFrame.future,
  dateRange,
  info,
  monthLabel,
  yearLabel,
  locale = 'en-US',
  onChange,
  onReset,
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
        dateRange={dateRange}
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
        <div>
          <StyledCalendar size={24} color={color.spaceMedium} />
          <ButtonText hasDate={!!date}>
            {!!date
              ? date.toLocaleString(locale, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : placeholder}
          </ButtonText>
        </div>
        {onReset && date && (
          <ResetButton
            onClick={e => {
              onReset()
              e.stopPropagation()
            }}
            type="button"
            data-testid="reset-button"
          >
            <CloseRounded size={16} />
          </ResetButton>
        )}
      </StyledButton>
    </>
  )
}

export { TimeFrame }
