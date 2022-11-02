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
  gradients,
} from '../../theme'
import {
  useIsMounted,
  useLockBodyScroll,
  usePrevious,
  useTransition,
} from '../../hooks'
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
  state: keyof typeof TransitionState
}

const DialogOverlay = styled.div<DialogOverlayStyles>`
  position: fixed;
  z-index: 2147483645; /* largest accepted z-index value as integer minus 2 */
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${color.overlay};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  opacity: ${props =>
    props.state === 'ENTERING' || props.state === 'ENTERED' ? 1 : 0};
  transition: opacity ${duration}ms ${easing.easeOutCubic};
  backdrop-filter: blur(16px);

  @media ${device.mobileL} {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    align-items: flex-start;
    padding-block-start: ${space[64]};
    padding-block-start: 10vmin;
    padding-block-end: ${space[64]};
    padding-block-end: 10vmin;
  }
`

interface ContentStyles {
  state?: keyof typeof TransitionState
}

const Content = styled.div<ContentStyles>`
  position: relative;
  width: 100%;
  background-color: ${color.background};
  border-radius: ${radius.lg} ${radius.lg} 0 0;
  overflow: hidden;
  transform: ${props =>
    props.state === TransitionState.ENTERING ||
    props.state === TransitionState.ENTERED
      ? 'translate3d(0,0,0)'
      : 'translate3d(0,1rem,0)'};
  transition: transform ${duration}ms ${easing.easeOutCubic};

  @media ${device.mobileL} {
    width: ${sizes.mobileL / 16}em;
    border-radius: ${radius.lg};
    overflow: unset;
    transform: ${props => {
      switch (props.state) {
        case 'EXITED':
          return 'translate3d(0,-1rem,0)'
        case 'EXITING':
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
  border-block-end: 1px solid ${color.stroke};
  color: ${color.foreground};
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
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
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
      ${gradients.nova},
      ${gradients.novaAlpha}
    );
  }

  &::after {
    bottom: 0;
    background-image: linear-gradient(
      to bottom,
      ${gradients.novaAlpha},
      ${gradients.nova}
    );
  }
`

const Body = styled.div`
  max-height: 50vh;
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
  padding-block-end: calc(${space[16]} + env(safe-area-inset-bottom));
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-height: 32em) {
    max-height: 65vh;
  }

  @media ${device.mobileL} {
    padding-block: ${space[32]};
    padding-inline: ${space[32]};
    max-height: none;
    overflow-y: unset;
    -webkit-overflow-scrolling: auto;
  }
`

type DialogBodyProps = {
  children: ReactNode
  title?: string
  back?: string
}

export const DialogBody: React.FC<DialogBodyProps> = ({
  children,
  ...props
}) => {
  return (
    <BodyWrapper>
      <Body {...props}>{children}</Body>
    </BodyWrapper>
  )
}

export const DialogFooter = styled.footer`
  position: relative;
  margin-block-start: -${space[16]};
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
  padding-block-end: calc(${space[16]} + env(safe-area-inset-bottom));

  @media ${device.mobileL} {
    margin-block-start: -${space[32]};
    padding-block: ${space[32]};
    padding-inline: ${space[32]};
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
  const isMounted = useIsMounted()
  const { persist, defaultOn, onToggle, onEntered, onExited, ...props } = config
  const isOnControlled = React.useCallback(() => {
    return props.on !== undefined
  }, [props.on])
  const [on, setOn] = useState(isOnControlled() ? props.on : false)
  const previousOn = usePrevious(isOnControlled() ? props.on : on)
  const show = () => (!isOnControlled() ? setOn(true) : undefined)
  const hide = () => {
    if (!isMounted()) return

    if (!isOnControlled()) {
      setOn(false)
    }
  }
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
    ({ key }: KeyboardEvent) => {
      if (key === 'Escape') {
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
