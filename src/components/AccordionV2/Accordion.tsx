import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import { ChevronDown } from '../../icons'
import { color, fontWeight, space } from '../../theme'
import { useState } from 'react'
import { css } from '@emotion/react'
import { useId } from 'react'

const Wrapper = styled.div`
  display: grid;
  border-block-start: 1px solid ${color.stroke};
`

const Item = styled.div`
  display: grid;
  padding-block: ${space[8]};
  border-block-end: 1px solid ${color.stroke};
  gap: ${space[8]};
`

interface ToggleProps {
  open: boolean
}

const Toggle = styled.span<ToggleProps>`
  padding: ${space[8]};
  border-radius: 50%;
  color: ${color.action};
  background-color: ${color.actionBackground};
  line-height: 1;

  ${({ open }) =>
    open &&
    css`
      rotate: 180deg;
    `}
`

const Title = styled.button`
  display: grid;
  grid-template-columns: 1fr auto;
  text-align: start;
  color: ${color.foreground};
  font-weight: ${fontWeight.semiBold};
  align-items: center;

  &:focus {
    box-shadow: none;

    ${Toggle} {
      box-shadow: 0 0 0 ${space[4]} var(--actionFocus);
    }
  }
`

interface BodyProps {
  open: boolean
}

const Body = styled.div<BodyProps>`
  display: none;

  ${({ open }) =>
    open &&
    css`
      display: block;
    `}
`

interface AccordionItem {
  title: ReactNode
  body: ReactNode
}

interface Props {
  items: AccordionItem[]
  collapsible?: boolean
  multiple?: boolean
  index?: number | number[]
  defaultIndex?: number | number[]
  onChange?: (index: number) => void
}

export const Accordion = ({
  items,
  collapsible = false,
  multiple = false,
  index,
  defaultIndex,
  onChange,
}: Props) => {
  const id = useId()
  const arrayFromNumber = (number: number | number[]) =>
    typeof number === 'number' ? [number] : number
  const controlled = typeof index !== 'undefined'
  const initialOpenIndex = collapsible
    ? defaultIndex
      ? arrayFromNumber(defaultIndex)
      : []
    : defaultIndex
    ? arrayFromNumber(defaultIndex)
    : [0]
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpenIndex)
  const open = controlled ? arrayFromNumber(index) : uncontrolledOpen

  const handleToggle = (index: number) => {
    if (controlled) {
      return onChange?.(index)
    }

    if (multiple) {
      if (open.includes(index)) {
        if (!collapsible && open.length === 1) return

        return setUncontrolledOpen(previous =>
          previous.filter(i => i !== index)
        )
      }

      return setUncontrolledOpen(previous => [...previous, index])
    }

    if (collapsible && open.includes(index)) {
      return setUncontrolledOpen([])
    }

    setUncontrolledOpen([index])
  }

  return (
    <Wrapper>
      {items.map(({ title, body }, index) => (
        <Item key={index}>
          <Title
            onClick={() => handleToggle(index)}
            aria-expanded={open.includes(index)}
            aria-controls={`${id}-region-${index}`}
            id={`${id}-label-${index}`}
          >
            {title}
            <Toggle open={open.includes(index)}>
              <ChevronDown size="16" />
            </Toggle>
          </Title>
          <Body
            open={open.includes(index)}
            id={`${id}-region-${index}`}
            role="region"
            aria-labelledby={`${id}-label-${index}`}
          >
            {body}
          </Body>
        </Item>
      ))}
    </Wrapper>
  )
}
