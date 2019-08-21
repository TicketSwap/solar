import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { Transition } from 'react-spring'
import PropTypes from 'prop-types'
import { Portal } from '../Portal'
import { callAll, stopPropagation } from '../../utils'
import {
  space,
  device,
  sizes,
  fontWeight,
  easingFunctions,
  radius,
  color,
} from '../../theme'
import { useLockBodyScroll, usePrevious } from '../../hooks'

const DialogOverlay = styled.div`
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

const Content = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  border-radius: ${radius.lg} ${radius.lg} 0 0;
  overflow: hidden;

  @media ${device.mobileL} {
    width: ${sizes.mobileL / 16}em;
    border-radius: ${radius.lg};
    overflow: unset;
  }
`

export function DialogContent({ children, ...props }) {
  const ref = useRef(null)
  useLockBodyScroll(ref)

  return (
    <Content ref={ref} {...props}>
      {children}
    </Content>
  )
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

export const DialogAdornment = styled.span`
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

export function DialogBody({ children }) {
  return (
    <BodyWrapper>
      <Body>{children}</Body>
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

export function Dialog({ children, ...props }) {
  const stateAndHelpers = useDialog(props)
  return children(stateAndHelpers)
}

Dialog.propTypes = {
  defaultOn: PropTypes.bool,
  persist: PropTypes.bool,
  onToggle: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
}

Dialog.defaultProps = {
  defaultOn: false,
  onToggle: () => {},
}

export function useDialog({ persist, defaultOn, onToggle, ...props }) {
  const isOnControlled = React.useCallback(() => {
    return props.on !== undefined
  }, [props.on])

  const [on, setOn] = useState(isOnControlled() ? props.on : false)
  const previousOn = usePrevious(isOnControlled() ? props.on : on)
  const show = () => !isOnControlled() && setOn(true)
  const hide = () => !isOnControlled() && setOn(false)
  const toggle = () => !isOnControlled() && setOn(!on)

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

  const getToggleProps = (props = {}) => ({
    'aria-controls': 'target',
    'aria-expanded': Boolean(on),
    ...props,
    onClick: callAll(props.onClick, toggle),
  })

  const getWindowProps = (props = {}) => ({
    on: getOn(),
    hide,
    persist,
    ...props,
    onClick: persist ? props.onClick : callAll(props.onClick, toggle),
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

export function DialogWindow({ children, on, hide, ...props }) {
  const handleHide = React.useCallback(
    ({ keyCode }) => keyCode === 27 && hide(),
    [hide]
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
      <Transition
        items={on}
        from={{
          transform: `translate3d(0,${
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia(device.mobileL).matches
              ? -1
              : 1
          }rem,0)`,
          opacity: 0,
        }}
        enter={{
          transform: 'translate3d(0,0rem,0)',
          opacity: 1,
        }}
        leave={{
          transform: 'translate3d(0,1rem,0)',
          opacity: 0,
        }}
        config={{
          duration: 300,
          easing: easingFunctions.easeInOutCubic,
        }}
      >
        {show =>
          show &&
          (styles => (
            <DialogOverlay
              aria-modal="true"
              tabIndex="-1"
              style={{ opacity: styles.opacity }}
              data-testid="dialog-overlay"
              {...props}
            >
              <DialogContent
                onClick={stopPropagation}
                data-testid="dialog-content"
                style={styles}
              >
                {children}
              </DialogContent>
            </DialogOverlay>
          ))
        }
      </Transition>
    </Portal>
  )
}

DialogWindow.propTypes = {
  on: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
}
