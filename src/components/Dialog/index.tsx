import React, { useState, useEffect, ReactNode, ReactElement } from 'react'
import styled from '@emotion/styled'
import { Portal } from '../Portal'
import { callAll, stopPropagation } from '../../utils'
import {
  space,
  device,
  sizes,
  fontWeight,
  radius,
  color,
  easing,
} from '../../theme'
import { useLockBodyScroll, usePrevious, useTransition } from '../../hooks'
import { TransitionState } from '../../hooks/useTransition'

const duration = 200

export interface DialogWindowProps {
  children: ReactNode
  on?: boolean
  hide: () => void
  onEscKeyDown?: Function
  onEntered?: Function
  onExited?: Function
  persist?: boolean
}

interface GetWindowToggleProps {
  onClick?: Function
  on?: boolean
  onEscKeyDown?: Function
  onEntered?: Function
  onExited?: Function
  persist?: boolean
}

export interface UseDialogProps {
  defaultOn?: boolean
  persist?: boolean
  onToggle?: (on: boolean | undefined) => any
  onEntered?: Function
  onExited?: Function
  on?: boolean
  onClick?: Function
}

export interface DialogProps extends UseDialogProps {
  children: (props: {
    on?: boolean
    show: () => void
    hide: () => void
    toggle: () => void
    getToggleProps: (props?: GetWindowToggleProps | undefined) => any
    getWindowProps: (props?: GetWindowToggleProps | undefined) => any
  }) => ReactElement
}

interface DialogOverlayStyles {
  state: boolean | TransitionState
}

const DialogOverlay = styled.div<DialogOverlayStyles>`
  position: fixed;
  z-index: 2147483646; /* largest accepted z-index value as integer minus 1 */
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  opacity: ${props =>
    props.state === 'entering' || props.state === 'entered' ? 1 : 0};
  transition: opacity ${duration}ms ${easing.easeOutCubic};

  @media ${device.mobileL} {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    align-items: flex-start;
    padding-top: ${space[64]};
    padding-top: 10vmin;
    padding-bottom: ${space[64]};
    padding-bottom: 10vmin;
  }
`

interface ContentStyles {
  state?: boolean | TransitionState
}

const Content = styled.div<ContentStyles>`
  position: relative;
  width: 100%;
  background-color: ${color.nova};
  border-radius: ${radius.lg} ${radius.lg} 0 0;
  overflow: hidden;
  transform: ${props =>
    props.state === 'entering' || props.state === 'entered'
      ? 'translate3d(0,0,0)'
      : 'translate3d(0,1rem,0)'};
  transition: transform ${duration}ms ${easing.easeOutCubic};

  @media ${device.mobileL} {
    width: ${sizes.mobileL / 16}em;
    border-radius: ${radius.lg};
    overflow: unset;
    transform: ${props => {
      switch (props.state) {
        case 'exited':
          return 'translate3d(0,-1rem,0)'
        case 'exiting':
          return 'translate3d(0,1rem,0)'
        default:
          return 'translate3d(0,0,0)'
      }
    }};
  }
`

export const DialogContent: React.FC<any> = ({ children, ...props }) => {
  useLockBodyScroll()
  return <Content {...props}>{children}</Content>
}

export const DialogHeader = styled.header`
  position: relative;
  height: ${space[56]};
  border-bottom: 1px solid #eee;
  color: ${color.space};
  font-weight: ${fontWeight.semiBold};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface DialogAdornmentStyles {
  left?: boolean
  right?: boolean
}

export const DialogAdornment = styled.span<DialogAdornmentStyles>`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${space[16]};
  left: ${props => (props.left ? 0 : 'auto')};
  right: ${props => (props.right ? 0 : 'auto')};

  button {
    line-height: 0;
  }
`

const BodyWrapper = styled.div`
  position: relative;
  border-radius: ${radius.lg} ${radius.lg} 0 0;
  overflow: hidden;

  @media ${device.mobileL} {
    border-radius: ${radius.lg};
    overflow: unset;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
    z-index: 1;
    left: 0;
    right: 0;
    height: ${space[16]};

    @media ${device.mobileL} {
      display: none;
    }
  }

  &::before {
    top: 0;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
  }

  &::after {
    bottom: 0;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
  }
`

const Body = styled.div`
  max-height: 50vh;
  padding: ${space[16]};
  padding-bottom: calc(${space[16]} + env(safe-area-inset-bottom));
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-height: 32em) {
    max-height: 65vh;
  }

  @media ${device.mobileL} {
    padding: ${space[32]};
    max-height: none;
    overflow-y: unset;
    -webkit-overflow-scrolling: auto;
  }
`

export const DialogBody: React.FC = ({ children, ...props }) => {
  return (
    <BodyWrapper>
      <Body {...props}>{children}</Body>
    </BodyWrapper>
  )
}

export const DialogFooter = styled.footer`
  position: relative;
  z-index: 1;
  margin-top: -${space[16]};
  padding: ${space[16]};
  padding-bottom: calc(${space[16]} + env(safe-area-inset-bottom));

  @media ${device.mobileL} {
    margin-top: -${space[32]};
    padding: ${space[32]};
  }
`

export function Dialog({
  children,
  defaultOn = false,
  onToggle = () => {},
  onEntered = () => {},
  onExited = () => {},
  onClick = () => {},
  ...props
}: DialogProps) {
  const stateAndHelpers = useDialog({
    defaultOn,
    onToggle,
    onEntered,
    onExited,
    onClick,
    ...props,
  })
  return children(stateAndHelpers)
}

export function useDialog(config: UseDialogProps = {}) {
  const { persist, defaultOn, onToggle, onEntered, onExited, ...props } = config
  const isOnControlled = React.useCallback(() => {
    return props.on !== undefined
  }, [props.on])
  const [on, setOn] = useState(isOnControlled() ? props.on : false)
  const previousOn = usePrevious(isOnControlled() ? props.on : on)
  const show = () => (!isOnControlled() ? setOn(true) : undefined)
  const hide = () => (!isOnControlled() ? setOn(false) : undefined)
  const toggle = () => (!isOnControlled() ? setOn(!on) : undefined)

  const getOn = React.useCallback(() => {
    return isOnControlled() ? props.on : on
  }, [on, props.on, isOnControlled])

  useEffect(() => {
    if (!isOnControlled() && typeof previousOn === 'undefined' && defaultOn) {
      setOn(true)
    }
  }, [previousOn, defaultOn, isOnControlled])

  useEffect(() => {
    if (typeof previousOn !== 'undefined' && getOn() !== previousOn) {
      onToggle && onToggle(isOnControlled() ? props.on : on)
    }
  }, [props.on, on, previousOn, onToggle, getOn, isOnControlled])

  const getToggleProps = () => ({
    'aria-controls': 'target',
    'aria-expanded': Boolean(on),
    ...props,
    // @ts-ignore
    onClick: callAll(props.onClick, toggle),
  })

  const getWindowProps = () => ({
    ...props,
    on: getOn(),
    hide,
    persist,
    // @ts-ignore
    onClick: persist ? props.onClick : callAll(props.onClick, toggle),
    onEntered,
    onExited,
  })

  return {
    on: getOn(),
    show,
    hide,
    toggle,
    getToggleProps,
    getWindowProps,
  }
}

export function DialogWindow({
  children,
  on,
  hide,
  onEscKeyDown,
  onEntered,
  onExited,
  ...props
}: DialogWindowProps) {
  const [state, mounted] = useTransition({
    in: on || false,
    timeout: duration,
    onEntered,
    onExited,
  })
  const handleHide = React.useCallback(
    ({ keyCode }) => {
      if (keyCode === 27) {
        onEscKeyDown && onEscKeyDown()
        hide()
      }
    },
    [onEscKeyDown, hide]
  )

  useEffect(() => {
    if (!props.persist) {
      document.addEventListener('keydown', handleHide, false)
    }

    return () => {
      if (!props.persist) {
        document.removeEventListener('keydown', handleHide, false)
      }
    }
  }, [handleHide, props.persist])

  return (
    <Portal>
      {mounted && (
        <DialogOverlay
          aria-modal="true"
          tabIndex={-1}
          state={state}
          data-testid="dialog-overlay"
          {...props}
        >
          <DialogContent
            onClick={stopPropagation}
            data-testid="dialog-content"
            state={state}
          >
            {children}
          </DialogContent>
        </DialogOverlay>
      )}
    </Portal>
  )
}
