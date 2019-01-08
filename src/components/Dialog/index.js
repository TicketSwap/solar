import React, { Component } from 'react'
import styled from 'styled-components'
import { Transition } from 'react-spring'
import PropTypes from 'prop-types'
import { Portal } from '../Portal'
import { callAll, stopPropagation } from '../../utils'
import { space, device, sizes, fontWeight, easingFunctions } from '../../theme'

const Overlay = styled.div`
  position: fixed;
  z-index: 2147483647; /* largest accepted z-index value as integer */
  left: 0;
  top: 0;
  right: 0;
  pointer-events: ${props => (props.clickable ? 'auto' : 'none')};
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

const Content = styled.div`
  width: 100%;
  background-color: white;
  border-radius: ${space[8]} ${space[8]} 0 0;

  @media ${device.mobileL} {
    width: ${sizes.mobileL / 16}em;
    border-radius: ${space[8]};
  }
`

export const DialogHeader = styled.header`
  position: relative;
  height: ${space[56]};
  border-bottom: 1px solid #eee;
  font-weight: ${fontWeight.semiBold};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: calc(-${space[16]} - 1px);
    height: ${space[16]};
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );

    @media ${device.tablet} {
      bottom: calc(-${space[32]} - 1px);
      height: ${space[32]};
    }
  }
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

export const DialogBody = styled.div`
  padding: ${space[16]};
  max-height: 65vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }

  @media ${device.mobileL} {
    max-height: 45vh;
    padding: ${space[32]};
  }
`

export const DialogFooter = styled.footer`
  position: relative;
  padding: ${space[16]};

  @media ${device.mobileL} {
    padding: ${space[32]};
  }

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: -${space[16]};
    height: ${space[16]};
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );

    @media ${device.tablet} {
      top: -${space[32]};
      height: ${space[32]};
    }
  }
`

export class Dialog extends Component {
  static propTypes = {
    showOnMount: PropTypes.bool,
    defaultOn: PropTypes.bool,
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
    onClick: callAll(props.onClick, this.toggle),
    onKeyDown: callAll(
      props.onKeyDown,
      ({ keyCode }) => keyCode === 27 && this.hide()
    ),
    ...props,
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

export class DialogWindow extends Component {
  static propTypes = {
    on: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
  }

  handleHide = ({ keyCode }) => keyCode === 27 && this.props.hide()

  componentDidMount() {
    document.addEventListener('keydown', this.handleHide, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleHide, false)
  }

  render() {
    const { children, on, ...props } = this.props

    return (
      <Portal>
        <Transition
          items={on}
          from={{
            transform: `translate3d(0,${
              typeof window !== 'undefined' &&
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
              <Overlay
                aria-modal="true"
                clickable={on}
                tabIndex="-1"
                style={{ opacity: styles.opacity }}
                data-testid="dialog-overlay"
                {...props}
              >
                <Content
                  onClick={stopPropagation}
                  data-testid="dialog-content"
                  style={styles}
                >
                  {children}
                </Content>
              </Overlay>
            ))
          }
        </Transition>
      </Portal>
    )
  }
}
