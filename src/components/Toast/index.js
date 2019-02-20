import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Transition, Spring, animated } from 'react-spring/renderprops'
import { Portal } from '../Portal'
import { space, shadow, device, color, radius } from '../../theme'

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: ${space[512]};
  max-width: 100%;
  flex-direction: column-reverse;
  pointer-events: none;
`

const Item = styled(animated.div)`
  position: absolute;
  width: 100%;
  pointer-events: auto;
  padding: 0 ${space[16]} ${space[16]};

  @media ${device.tablet} {
    padding: 0 ${space[32]} ${space[32]};
  }
`

export const Toast = styled.div`
  border-radius: ${radius.lg};
  background-color: ${color.stardustLight};
  box-shadow: ${shadow.strong};
  padding: ${space[16]};
`

Toast.propTypes = {
  persist: PropTypes.bool,
}

const { Provider, Consumer } = React.createContext()

export const ToastConsumer = Consumer

export function withToastContext(Component) {
  return function WrapperComponent(props) {
    return (
      <ToastConsumer>
        {stateAndHelpers => <Component {...props} {...stateAndHelpers} />}
      </ToastConsumer>
    )
  }
}

export class ToastProvider extends PureComponent {
  itemTimers = []
  cleanupTimer = null
  delay = 3000
  initialState = { id: 0, items: [] }
  state = this.initialState

  // TODO: Figure out proper key handling

  addItem = component => {
    const { persist } = component.props

    this.setState(state => ({
      id: state.id + 1,
      items: [
        { key: persist ? state.items.length : state.id, component, persist },
        ...state.items,
      ],
    }))
  }

  clearAllTimers = () => {
    for (let i = 0; i < this.itemTimers.length; i++) {
      clearTimeout(this.itemTimers[i])
    }

    if (this.cleanupTimer) {
      clearTimeout(this.cleanupTimer)
    }
  }

  clearItems = () =>
    (this.cleanupTimer = setTimeout(
      () =>
        this.setState(state => ({
          items: state.items.filter(item => item.persist),
        })),
      this.delay
    ))

  removeItem = key =>
    this.setState(state => ({
      items: state.items.filter(item => item.key !== key),
    }))

  getStateAndHelpers() {
    return {
      add: this.addItem,
      remove: () => this.removeItem(this.state.items.length - 1),
      clearAll: () => this.setState(this.initialState),
    }
  }

  componentWillUnmount() {
    this.clearAllTimers()
  }

  render() {
    return (
      <Provider value={this.getStateAndHelpers()}>
        {this.props.children}
        <Portal>
          <Transition
            items={this.state.items}
            keys={item => item.key}
            from={{ opacity: 0, y: 100 }}
            enter={{ opacity: 1, y: 0 }}
            leave={{ opacity: 0, y: 0 }}
          >
            {(item, state, index) => ({ opacity, y }) => (
              <Container
                style={{
                  zIndex: index < 4 ? 16 - index : 16,
                  display: index < 4 ? 'flex' : 'none',
                }}
                onMouseEnter={this.clearAllTimers}
                onMouseLeave={this.clearItems}
              >
                <Spring
                  native
                  to={{
                    o: index === 3 ? 0 : opacity - index * 0.16,
                    ys: [y - index * 16, 1 - index / 16],
                  }}
                  onRest={e =>
                    e.o === 0 && state === 'enter' && !item.persist
                      ? this.itemTimers.push(
                          setTimeout(
                            () => this.removeItem(item.key),
                            this.delay
                          )
                        )
                      : null
                  }
                >
                  {({ o, ys }) => (
                    <Item
                      style={{
                        opacity: o,
                        transform: ys.interpolate(
                          (y, s) => `translate3d(0,${y}%, 0) scale(${s})`
                        ),
                      }}
                    >
                      {item.component}
                    </Item>
                  )}
                </Spring>
              </Container>
            )}
          </Transition>
        </Portal>
      </Provider>
    )
  }
}
