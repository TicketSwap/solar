import React, { Component, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
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
import { useLockBodyScroll } from '../../hooks'

const DialogOverlay = styled.div`
  position: fixed;
  z-index: 2147483647; /* largest accepted z-index value as integer */
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;

  @media ${device.mobileL} {
    align-items: flex-start;
    padding-top: ${space[64]};
    padding-top: 10vmin;
  }
`

const DialogContent = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  border-radius: ${radius.lg} ${radius.lg} 0 0;
  overflow: hidden;

  @media ${device.mobileL} {
    width: ${sizes.mobileL / 16}em;
    border-radius: ${radius.lg};
  }
`

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

    @media ${device.tablet} {
      height: ${space[32]};
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
  max-height: 65vh;
  padding: ${space[16]};
  padding-bottom: calc(${space[16]} + env(safe-area-inset-bottom));
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }

  @media ${device.mobileL} {
    padding: ${space[32]};
    max-height: calc(80vh - ${144 / 16}rem);
  }

  @media (min-height: ${sizes.tablet}) and (min-width: ${sizes.tablet}) {
    max-height: calc(65vh - ${144 / 16}rem);
  }
`

export function DialogBody({ children }) {
  const bodyRef = useRef(null)
  useLockBodyScroll(bodyRef)

  return (
    <BodyWrapper>
      <Body ref={bodyRef}>{children}</Body>
    </BodyWrapper>
  )
}

export const DialogFooter = styled.footer`
  padding-left: ${space[16]};
  padding-right: ${space[16]};
  padding-bottom: ${space[16]};
  padding-bottom: calc(${space[16]} + env(safe-area-inset-bottom));

  @media ${device.mobileL} {
    padding-left: ${space[32]};
    padding-right: ${space[32]};
    padding-bottom: ${space[32]};
  }
`

export class Dialog extends Component {
  static propTypes = {
    showOnMount: PropTypes.bool,
    defaultOn: PropTypes.bool,
    persist: PropTypes.bool,
    on: PropTypes.bool,
    onToggle: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
  }

  static defaultProps = {
    defaultOn: false,
    onToggle: () => {},
  }

  componentDidMount() {
    if (this.props.showOnMount) {
      this.setOnState()
    }
  }

  isOnControlled() {
    return this.props.on !== undefined
  }

  getOn(state = this.state) {
    return this.isOnControlled() ? this.props.on : state.on
  }

  getToggleProps = (props = {}) => ({
    'aria-controls': 'target',
    'aria-expanded': Boolean(this.getOn()),
    ...props,
    onClick: callAll(props.onClick, this.toggle),
  })

  getWindowProps = (props = {}) => ({
    on: this.getOn(),
    hide: this.hide,
    persist: this.props.persist,
    ...props,
    onClick: this.props.persist
      ? props.onClick
      : callAll(props.onClick, this.toggle),
  })

  getStateAndHelpers() {
    return {
      on: this.getOn(),
      getToggleProps: this.getToggleProps,
      getWindowProps: this.getWindowProps,
      show: this.show,
      hide: this.hide,
      toggle: this.toggle,
    }
  }

  setOnState = (state = !this.getOn()) => {
    if (this.isOnControlled()) {
      this.props.onToggle(state, this.getStateAndHelpers())
    } else {
      this.setState({ on: state }, () => {
        this.props.onToggle(this.getOn(), this.getStateAndHelpers())
      })
    }
  }

  show = this.setOnState.bind(this, true)
  hide = this.setOnState.bind(this, false)
  toggle = this.setOnState.bind(this, undefined)

  state = {
    on: this.getOn({ on: this.props.defaultOn }),
  }

  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

export function useDialog(props = {}) {
  const { persist, showOnMount, defaultOn, onToggle } = props
  const [on, setOn] = useState(defaultOn || false)
  const show = () => setOn(true)
  const hide = () => setOn(false)
  const toggle = () => setOn(!on)

  useEffect(() => {
    showOnMount && setOn(true)
  }, [])

  useEffect(() => {
    onToggle && onToggle(on)
  }, [on])

  const getToggleProps = (props = {}) => ({
    'aria-controls': 'target',
    'aria-expanded': Boolean(on),
    ...props,
    onClick: callAll(props.onClick, toggle),
  })

  const getWindowProps = (props = {}) => ({
    on,
    hide,
    persist,
    ...props,
    onClick: persist ? props.onClick : callAll(props.onClick, toggle),
  })

  return {
    on,
    show,
    hide,
    toggle,
    getToggleProps,
    getWindowProps,
  }
}

export function DialogWindow({ children, on, hide, ...props }) {
  const handleHide = ({ keyCode }) => keyCode === 27 && hide()

  useEffect(() => {
    if (props.persist) return false
    document.addEventListener('keydown', handleHide, false)
    return () => document.removeEventListener('keydown', handleHide, false)
  }, [])

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
