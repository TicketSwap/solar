import React from 'react'
import { device, space, color, fontWeight } from '../../theme'
import { ChevronDown } from '@ticketswap/comets'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'
import * as Reach from '@reach/accordion'
import {
  AccordionItemProps,
  AccordionPanelProps,
  AccordionButtonProps,
} from '@reach/accordion'

export interface AccordionProps {
  collapsible?: boolean
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  collapsible = false,
  ...props
}) => {
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

const AccordionItem = styled<React.FC<AccordionItemProps>>(Reach.AccordionItem)`
  border-top: 1px solid ${color.spaceLightest};

  &:last-of-type {
    border-bottom: 1px solid ${color.spaceLightest};
  }
`

const Button = styled<React.FC<AccordionButtonProps>>(Reach.AccordionButton)`
  font-weight: ${fontWeight.semiBold};
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-top: ${space[12]};
  padding-bottom: ${space[12]};
  text-align: left;

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

const AccordionButton: React.FC<AccordionButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button {...props}>
      <span>{children}</span>
      <ButtonAdornment>
        <ChevronDown size={16} />
      </ButtonAdornment>
    </Button>
  )
}

const AccordionPanel = styled<React.FC<AccordionPanelProps>>(
  Reach.AccordionPanel
)`
  outline: none;
  padding-bottom: ${space[12]};
`

export { Accordion, AccordionItem, AccordionButton, AccordionPanel }
