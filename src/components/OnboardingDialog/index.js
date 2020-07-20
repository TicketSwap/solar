import React, { useState } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {
  radius,
  shadow,
  space,
  duration,
  transition,
  color,
  device,
} from '../../theme'
import { useTransition } from '../../hooks'
import { EXITED, ENTERING, ENTERED, EXITING } from '../../hooks/useTransition'

const BodyWrapper = styled.div`
  background-color: ${color.nova};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.strong};
  padding: ${space[32]};
`

const OnboardingDialogBody = ({ children, ...props }) => (
  <BodyWrapper {...props}>{children}</BodyWrapper>
)

OnboardingDialogBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

const DialogWrapper = styled.div`
  position: absolute;
  top: ${space[56]};
  left: 0;
  right: 0;
  z-index: 1;

  @media ${device.tablet} {
    top: ${space[48]};
  }
`

const OnboardingDialog = ({ children, show, ...props }) => {
  if (!show) return null

  return (
    <DialogWrapper aria-modal="true" role="dialog" tabindex="-1" {...props}>
      {children}
    </DialogWrapper>
  )
}

OnboardingDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

const Container = styled.div`
  position: relative;
`

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${color.novaLightAlpha};
  opacity: ${props =>
    props.state === ENTERING || props.state === ENTERED ? 1 : 0};
  transition: opacity ${transition};
`

const OnboardingWrapper = ({ children, active, state, ...props }) => {
  return (
    <Container {...props}>
      {children}
      {active && <Backdrop state={state} />}
    </Container>
  )
}

OnboardingWrapper.propTypes = {
  active: PropTypes.bool.isRequired,
  state: PropTypes.oneOf([EXITED, ENTERING, ENTERED, EXITING]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

const Onboarding = ({ children, defaultOn }) => {
  const onboardingProps = useOnboarding({
    defaultOn,
  })

  return children(onboardingProps)
}

Onboarding.defaultProps = {
  defaultOn: true,
}

Onboarding.propTypes = {
  defaultOn: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

function useOnboarding(config = {}) {
  const { defaultOn = true, defaultTransitionState = EXITED } = config

  const [show, setShow] = useState(defaultOn)
  const [active, setActive] = useState(defaultOn)
  const [state] = useTransition({
    in: show,
    timeout: duration,
    onExited: () => setActive(false),
    defaultTransitionState,
  })

  return {
    show: () => {
      setActive(true)
      setShow(true)
    },
    hide: () => setShow(false),
    getOnboardingProps: () => ({
      show,
    }),
    state,
    active,
  }
}

export {
  OnboardingDialog,
  OnboardingDialogBody,
  useOnboarding,
  OnboardingWrapper,
}

export default Onboarding
