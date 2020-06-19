import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import {
  color,
  space,
  fontWeight,
  transition,
  radius,
  device,
  lineHeight,
} from '../../theme'
import {
  CloseRounded,
  InfoRounded,
  WarningRounded,
  CheckmarkRounded,
} from '@ticketswap/comets'
import { H4 } from '../Heading'

const textColor = props => css`
  color: ${props.variant === 'success'
    ? color.titan
    : props.variant === 'error'
    ? color.mars
    : props.variant === 'warning'
    ? color.sun
    : color.earth};
`

const Container = styled.div`
  background-color: ${props =>
    props.variant === 'success'
      ? color.titanLightest
      : props.variant === 'error'
      ? color.marsLightest
      : props.variant === 'warning'
      ? color.sunLightest
      : color.earthLightest};
  border-radius: ${radius.md};
  min-height: ${space[44]};
  display: flex;
  align-items: flex-start;

  @media ${device.tablet} {
    min-height: ${space[56]};
  }

  a {
    ${textColor};
  }
`

const Adornment = styled.span`
  ${textColor};
  width: ${space[44]};
  height: ${space[44]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  @media ${device.tablet} {
    width: ${space[56]};
    height: ${space[56]};
  }
`

const Main = styled.div`
  flex-basis: 100%;
  padding: ${11 / 16}rem ${10 / 16}rem ${10 / 16}rem 0;

  @media ${device.tablet} {
    padding: ${15 / 16}rem ${14 / 16}rem ${14 / 16}rem 0;
  }
`

const Title = styled(H4)`
  line-height: ${lineHeight.title};
  font-weight: ${fontWeight.semiBold};
  margin-bottom: ${6 / 16}rem;

  @media ${device.tablet} {
    line-height: 1.4;
  }
`

const Message = styled.p`
  color: ${color.space};
  margin: 0;
`

const Action = styled.button`
  ${textColor};
  outline: 0;
  font-weight: ${fontWeight.bold};
  flex-shrink: 0;
  transition: color ${transition};
  margin-top: ${6 / 16}rem;

  @media ${device.tablet} {
    margin-top: ${6 / 16}rem;
  }

  &:focus {
    box-shadow: none;
  }

  &:hover,
  &:focus {
    color: ${props =>
      props.variant === 'success'
        ? color.titanLight
        : props.variant === 'error'
        ? color.marsLight
        : props.variant === 'warning'
        ? color.sunLight
        : color.earthLight};
  }
`

export const Alert = ({ title, action, ...props }) => {
  return (
    <Container {...props}>
      <Adornment variant={props.variant}>
        {props.variant === 'success' ? (
          <CheckmarkRounded size={24} />
        ) : props.variant === 'error' ? (
          <CloseRounded size={24} />
        ) : props.variant === 'warning' ? (
          <WarningRounded size={24} />
        ) : (
          <InfoRounded size={24} />
        )}
      </Adornment>
      <Main>
        {title && <Title as="h4">{title}</Title>}
        <Message>{props.children}</Message>
        {action && (
          <Action
            variant={props.variant}
            onClick={action.onClick}
            type="button"
          >
            {action.label}
          </Action>
        )}
      </Main>
    </Container>
  )
}

Alert.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
}

Alert.defaultProps = {
  variant: 'info',
}
