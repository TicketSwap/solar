import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import {
  color,
  space,
  fontWeight,
  radius,
  transition,
  device,
} from '../../theme'
import { ChevronDown } from '../../icons'

export interface CollapsibleProps {
  buttonLabel?: string
  defaultOn?: boolean
  children: ReactNode
}

interface CollapsibleStyledProps {
  isOn: boolean
}

const Toggle = styled.button<CollapsibleStyledProps>`
  position: relative;
  text-align: start;
  inline-size: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${color.elevatedBackground};
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
  font-weight: ${fontWeight.semiBold};
  border-start-start-radius: ${radius.md};
  border-start-end-radius: ${radius.md};
  border-end-start-radius: ${props => (props.isOn ? 0 : radius.md)};
  border-end-end-radius: ${props => (props.isOn ? 0 : radius.md)};

  @media ${device.tablet} {
    padding-inline-start: ${space[24]};
  }
`

const Body = styled.div<CollapsibleStyledProps>`
  max-block-size: ${props => (props.isOn ? '100vh' : 0)};
  overflow: hidden;
  transition: max-height ${transition};
  background-color: ${color.elevatedBackground};
  border-end-start-radius: ${radius.md};
  border-end-end-radius: ${radius.md};
  box-shadow: 0 1px 0
    ${props => (props.isOn ? color.strokeStrong : 'transparent')} inset;
`

const Content = styled.div`
  padding-block: ${space[16]};
  padding-inline: ${space[16]};

  @media ${device.tablet} {
    padding-inline-start: ${space[24]};
    padding-inline-end: ${space[24]};
  }
`

const IconContainer = styled.span<CollapsibleStyledProps>`
  display: inline-block;
  pointer-events: none;
  transform: rotate(${props => (props.isOn ? '180deg' : '0deg')});
`

export const Collapsible: React.FC<CollapsibleProps> = ({
  buttonLabel = 'Toggle',
  defaultOn = false,
  children,
  ...props
}) => {
  const [on, setOn] = React.useState(defaultOn)
  const toggle = () => setOn((on: boolean) => !on)

  return (
    <div {...props}>
      <Toggle onClick={toggle} isOn={on} aria-expanded={on}>
        {buttonLabel}
        <IconContainer isOn={on}>
          <ChevronDown size={24} />
        </IconContainer>
      </Toggle>
      <Body isOn={on} role="region" hidden={!on}>
        <Content>{children}</Content>
      </Body>
    </div>
  )
}
