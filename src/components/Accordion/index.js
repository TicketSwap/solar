import React from 'react'
import PropTypes from 'prop-types'
import { device, space, color, fontWeight } from '../../theme'
import { ChevronDown } from '@ticketswap/comets'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import * as Reach from '@reach/accordion'

export function Accordion({ children, collapsible, ...props }) {
  return (
    <Reach.Accordion {...props} collapsible={collapsible}>
      {children}
      <Global
        styles={css`
          :root {
            --reach-accordion: 1;
          }
        `}
      />
    </Reach.Accordion>
  )
}

Accordion.defaultProps = {
  collapsible: false,
}

Accordion.propTypes = {
  collapsible: PropTypes.bool.isRequired,
}

export const AccordionItem = styled(Reach.AccordionItem)`
  border-top: 1px solid ${color.spaceLightest};

  &:last-of-type {
    border-bottom: 1px solid ${color.spaceLightest};
  }
`

export const Button = styled(Reach.AccordionButton)`
  font-weight: ${fontWeight.semiBold};
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-top: ${space[12]};
  padding-bottom: ${space[12]};
  position: relative;
  z-index: 1;

  &[data-disabled] {
    cursor: not-allowed;
  }

  &:focus {
    box-shadow: none;

    > span:last-of-type {
      box-shadow: 0 0 0 0.25rem rgba(0, 182, 240, 0.24);
      outline: 0;
    }
  }

  &:hover {
    > span:first-of-type {
      opacity: 0.6;
    }
  }

  @media ${device.tablet} {
    padding-bottom: ${space[16]};
    padding-top: ${space[16]};
  }
`

const ButtonAdornment = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${color.earth};
  width: ${space[32]};
  height: ${space[32]};
  background-color: ${color.skyLight};
  border-radius: 50%;

  [data-state='open'] & {
    transform: rotate(180deg);
  }
`

export function AccordionButton({ children, ...props }) {
  return (
    <Button {...props}>
      <span>{children}</span>
      <ButtonAdornment>
        <ChevronDown size={16} />
      </ButtonAdornment>
    </Button>
  )
}

export const AccordionPanel = styled(Reach.AccordionPanel)`
  outline: none;
  padding-bottom: ${space[12]};
`
