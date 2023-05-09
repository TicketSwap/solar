import React from 'react'
import { useState, ReactNode } from 'react'
import styled from '@emotion/styled'
import { Text } from '../Text'
import { CloseRounded } from '../../icons'
import { space, radius, color, device, transition } from '../../theme'
import CalendarDialog from './CalendarDialog'
import { TimeFrame } from '../../utils/dates'

interface ButtonTextProps {
  hasDate: boolean
  leftAdornment?: ReactNode
}

interface DatePickerProps {
  date?: Date | null
  placeholder: string
  resetLabel?: string
  title?: string
  timeFrame?: TimeFrame
  dateRange?: { start: Date; end: Date }
  info?: string
  monthLabel: string
  yearLabel: string
  locale?: string
  leftAdornment?: ReactNode
  onChange: (date: Date) => void
  onReset?: () => void
}

const StyledButton = styled.button`
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
  border-radius: ${radius.md};
  background-color: ${color.elevatedBackground};
  color: ${color.foregroundSubtle};
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: ${space[8]};
  inline-size: 100%;
`

const ButtonText = styled(Text)<ButtonTextProps>`
  color: ${props =>
    props.hasDate ? color.foreground : color.foregroundSubtle};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media ${device.mobileM} {
    margin-inline-start: ${props => (props.leftAdornment ? space[16] : 0)};
  }
`

const LeftAdornment = styled.span`
  display: none;

  @media ${device.mobileM} {
    display: inline-block;
  }
`

const ResetButton = styled.span`
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
  resetLabel,
  onChange,
  onReset,
  leftAdornment,
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
          <LeftAdornment>{leftAdornment}</LeftAdornment>
          <ButtonText hasDate={!!date} leftAdornment={leftAdornment}>
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
            aria-label={resetLabel}
          >
            <CloseRounded size={16} />
          </ResetButton>
        )}
      </StyledButton>
    </>
  )
}

export { TimeFrame }
