import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { color, radius, fontWeight, device, space } from '../../theme'
import { isSameDate } from '../../utils/dates'

interface DayLabelProps {
  isCurrentDay: boolean
}

interface DayProps {
  date: Date
  isSelected: boolean
  isDisabled?: boolean
  onSelect: (date: Date) => void
}

interface DayButtonProps {
  selected: boolean
  onClick: () => void
}

const DayButton = styled.button<DayButtonProps>`
  padding-block: ${space[4]};
  padding-inline: ${space[4]};
  background-color: ${color.elevatedBackground};
  border-radius: ${radius.sm};
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${device.mobileM} {
    padding-block: ${space[8]};
    padding-inline: ${space[8]};
  }

  @media ${device.tablet} {
    padding-block: ${space[16]};
    padding-inline: ${space[16]};
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${color.earth};

      p {
        color: ${color.lightForeground};
      }
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: unset;
    `};
`

const DayLabel = styled.p<DayLabelProps>`
  font-weight: ${props => (props.isCurrentDay ? fontWeight.semiBold : fontWeight.regular)};
  color: ${color.foreground};
`

const Day = ({ date, isSelected, isDisabled, onSelect }: DayProps) => {
  const isCurrentDay = isSameDate(date, new Date())

  const handleSelect = () => {
    if (!isDisabled) {
      onSelect(date)
    }
  }

  return (
    <DayButton
      selected={isSelected}
      aria-selected={isSelected}
      {...(isDisabled ? { disabled: true } : {})}
      {...(isCurrentDay ? { 'aria-current': 'date' } : {})}
      onClick={handleSelect}
    >
      <DayLabel isCurrentDay={isCurrentDay}>{date.getDate()}</DayLabel>
    </DayButton>
  )
}

export default Day
