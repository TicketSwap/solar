import React, { useState } from 'react'
import styled from '@emotion/styled'
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
import { TransitionState } from '../../hooks/useTransition'

const BodyWrapper = styled.div`
  background-color: ${color.background};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.strong};
  padding-block: ${space[32]};
  padding-inline: ${space[32]};
`

const OnboardingDialogBody: React.FC = ({ children, ...props }) => (
  <BodyWrapper {...props}>{children}</BodyWrapper>
)

interface DialogWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  tabindex: string
}

const DialogWrapper = styled.div<DialogWrapperProps>`
  position: absolute;
  top: ${space[56]};
  left: 0;
  right: 0;

  @media ${device.tablet} {
    top: ${space[48]};
  }
`

export interface OnboardingDialogProps {
  show: boolean
  state: TransitionState
  active: boolean
}

const OnboardingDialog: React.FC<OnboardingDialogProps> = ({
  children,
  show,
  state,
  active,
  ...props
}) => {
  return (
    <>
      {active && <Backdrop state={state} />}
      {show && (
        <DialogWrapper aria-modal="true" role="dialog" tabindex="-1" {...props}>
          {children}
        </DialogWrapper>
      )}
    </>
  )
}

export interface OnboardingWrapperProps {}

const Container = styled.div`
  position: relative;
`

interface BackdropProps {
  state: TransitionState
}

const Backdrop = styled.div<BackdropProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff99;
  opacity: ${props =>
    props.state === TransitionState.ENTERING ||
    props.state === TransitionState.ENTERED
      ? 1
      : 0};
  transition: opacity ${transition};

  [data-theme='dark'] & {
    background-color: #1a212999;
  }
`

const OnboardingWrapper: React.FC<OnboardingWrapperProps> = ({
  children,
  ...props
}) => {
  return <Container {...props}>{children}</Container>
}

export interface OnboardingProps {
  defaultOn?: boolean
  children(data: object): React.ReactElement
}

const Onboarding: React.FC<OnboardingProps> = ({
  children,
  defaultOn = true,
}) => {
  const onboardingProps = useOnboarding({
    defaultOn,
  })

  return children(onboardingProps)
}

export interface useOnboardingProps {
  defaultOn?: boolean
  defaultTransitionState?: TransitionState
}

function useOnboarding(config: useOnboardingProps = {}) {
  const { defaultOn = true, defaultTransitionState = TransitionState.EXITED } =
    config

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
      state,
      active,
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
