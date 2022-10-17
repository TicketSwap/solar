import React, { ReactNode, useState, useRef, useId, useEffect } from 'react'
import styled from '@emotion/styled'
import {
  color,
  space,
  fontWeight,
  radius,
  device,
  lineHeight,
  transition,
  fontSize,
  duration,
  easing,
} from '../../theme'
import { ChevronDown } from '../../icons'
import { H3 } from '../Heading'

interface DetailsProps {
  open: boolean
}

const Details = styled.div<DetailsProps>`
  position: relative;
  text-align: start;
  width: 100%;
  background-color: ${color.elevatedBackground};
  border-radius: ${radius.md};
`

interface ButtonProps {
  open: boolean
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  color: ${color.action};
  font-family: inherit;
  font-size: ${fontSize[16]};
  font-weight: ${fontWeight.semiBold};
  line-height: ${lineHeight.solid};
  align-items: center;
  list-style: none;
  cursor: pointer;
  user-select: none;
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
  border-radius: 0;
  border-bottom: 1px solid
    ${({ open }) => (open ? color.strokeStrong : 'transparent')};

  @media (prefers-reduced-motion: no-preference) {
    transition: border-bottom ${transition}
      ${({ open }) => (open ? '200ms' : '0ms')};
  }

  &:focus-within {
    outline: 0;
    background-color: transparent;
    border-radius: calc(${radius.md} + 1px);
    border-start-start-radius: ${radius.md};
    border-start-end-radius: ${radius.md};
    border-end-start-radius: ${({ open }) => (open ? 0 : radius.md)};
    border-end-end-radius: ${({ open }) => (open ? 0 : radius.md)};
    box-shadow: 0 0 0 ${space[4]} ${color.actionFocus};
  }

  &:active {
    outline: 0;
    background-image: none;
  }
`

const StyledChevron = styled(ChevronDown)`
  transform: ${({ open }) => (open ? 'rotate(0)' : 'rotate(180deg)')};
  margin-inline-end: ${space[16]};

  @media (prefers-reduced-motion: no-preference) {
    transition: transform ${transition};
  }
`

const Panel = styled.div`
  padding-block: ${space[16]};
  padding-inline: ${space[16]};

  @media ${device.tablet} {
    padding-inline: ${space[24]};
  }
`

interface PanelWrapperProps {
  ref: React.MutableRefObject<HTMLDivElement | null>
  height: string
}

const PanelWrapper = styled.div<PanelWrapperProps>`
  height: ${({ height }) => `${height}px`};
  overflow: hidden;
  visibility: ${({ height }) =>
    Boolean(parseInt(height)) ? 'visible' : 'hidden'};

  @media (prefers-reduced-motion: no-preference) {
    transition: height 400ms ${easing.easeOutBack}, padding-block ${transition};

    &.closed {
      transition: height 600ms ${easing.easeOutBack},
        padding-block ${transition}, visibility ${transition} ${duration}ms;
    }
  }
`

interface CollapsibleProps {
  summary: string
  children: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onToggle?: (open: boolean) => void
  as?: string | undefined
}

export const Collapsible = ({
  summary,
  defaultOpen = false,
  children,
  onToggle,
  open: controlledOpen,
}: CollapsibleProps) => {
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)

  const open =
    typeof controlledOpen === 'undefined' ? uncontrolledOpen : controlledOpen

  const { animatedHeight } = useAnimatedHeight({
    open,
    ref,
  })

  return (
    <Details open={open} role="details">
      <H3>
        <Button
          aria-expanded={open}
          aria-controls={`region-${id}`}
          id={`button-${id}`}
          onClick={event => {
            onToggle?.(!open)
            event.preventDefault()
            setUncontrolledOpen(prev => !prev)
          }}
          open={open}
        >
          <StyledChevron open={open} size={24} />
          {summary}
        </Button>
      </H3>
      <PanelWrapper
        className={parseInt(animatedHeight) === 0 ? 'closed' : 'open'}
        ref={ref}
        height={animatedHeight}
      >
        <Panel
          id={`region-${id}`}
          role="region"
          aria-labelledby={`button-${id}`}
        >
          {children}
        </Panel>
      </PanelWrapper>
    </Details>
  )
}

interface AnimatedHeightProps {
  open: Boolean
  ref: React.MutableRefObject<HTMLDivElement | null>
}

const useAnimatedHeight = ({ open, ref }: AnimatedHeightProps) => {
  const [height, setHeight] = useState(open ? 'auto' : '0')

  useEffect(() => {
    const node = ref.current as HTMLDivElement

    if (!node) return

    if (open) {
      node.style.height = 'auto'
      const { height } = node.getBoundingClientRect()
      node.style.height = ''
      setHeight(`${height}`)
    } else {
      setHeight('0')
    }
  }, [open, ref])

  return { animatedHeight: height }
}
