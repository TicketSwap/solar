import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  color,
  space,
  fontWeight,
  radius,
  transition,
  device,
} from '../../theme'
import { ChevronDown } from '@ticketswap/comets'

const Toggle = styled.button`
  position: relative;
  text-align: left;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${color.stardust};
  padding: ${space[16]};
  font-weight: ${fontWeight.semiBold};
  border-top-left-radius: ${radius.md};
  border-top-right-radius: ${radius.md};
  border-bottom-left-radius: ${props => (props.isOn ? 0 : radius.md)};
  border-bottom-right-radius: ${props => (props.isOn ? 0 : radius.md)};

  @media ${device.tablet} {
    padding-left: ${space[24]};
  }
`

const Body = styled.div`
  position: relative;
  z-index: 1;
  max-height: ${props => (props.isOn ? '100vh' : 0)};
  overflow: hidden;
  transition: max-height ${transition};
  background-color: ${color.stardust};
  border-bottom-left-radius: ${radius.md};
  border-bottom-right-radius: ${radius.md};
  box-shadow: 0 1px 0
    ${props => (props.isOn ? color.spaceLightestAlpha : 'transparent')} inset;
`

const Content = styled.div`
  padding: ${space[16]};

  @media ${device.tablet} {
    padding-left: ${space[24]};
    padding-right: ${space[24]};
  }
`

const IconContainer = styled.span`
  display: inline-block;
  pointer-events: none;
  transform: rotate(${props => (props.isOn ? '180deg' : '0deg')});
`

export function Collapsible({ buttonLabel, defaultOn, children, ...props }) {
  const [on, setOn] = React.useState(defaultOn)
  const toggle = () => setOn(on => !on)

  return (
    <div {...props}>
      <Toggle onClick={toggle} isOn={on}>
        {buttonLabel}
        <IconContainer isOn={on}>
          <ChevronDown size={24} />
        </IconContainer>
      </Toggle>
      <Body isOn={on}>
        <Content>{children}</Content>
      </Body>
    </div>
  )
}

Collapsible.defaultProps = {
  buttonLabel: 'Toggle',
  defaultOn: false,
}

Collapsible.propTypes = {
  buttonLabel: PropTypes.string,
  defaultOn: PropTypes.bool,
}
