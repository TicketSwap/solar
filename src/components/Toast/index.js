import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Portal } from '../Portal'
import { space, shadow, device, radius, easing } from '../../theme'
import { useTransition } from '../../hooks'

const duration = 400

const ItemListContainer = styled.ul`
  position: fixed;
  z-index: 10;
  left: 0;
  bottom: 0;
  width: ${space[512]};
  max-width: 100%;
  flex-direction: column-reverse;
  pointer-events: none;

  @media ${device.tablet} {
    left: ${space[16]};
    bottom: ${space[16]};
  }
`

const ItemContainer = styled.li`
  position: absolute;
  width: 100%;
  pointer-events: auto;
  padding: 0 ${space[16]} ${space[16]};
  opacity: 0;
  transform: ${props =>
    props.state === 'entering' || props.state === 'entered'
      ? 'translate3d(0,0,0)'
      : 'translate3d(0,1rem,0)'};
  transition-duration: ${duration}ms;
  transition-timing-function: ${easing.easeOutCubic};
  transition-property: opacity, transform;

  &:nth-last-of-type(4) {
    transform: translate3d(0, -1.8rem, 0) scale(0.94);
  }

  &:nth-last-of-type(3) {
    opacity: ${props =>
      props.state === 'entering' || props.state === 'entered' ? 0.6 : 0};
    transform: translate3d(0, -1.2rem, 0) scale(0.96);
  }

  &:nth-last-of-type(2) {
    opacity: ${props =>
      props.state === 'entering' || props.state === 'entered' ? 0.8 : 0};
    transform: translate3d(0, -0.6rem, 0) scale(0.98);
  }

  &:last-of-type {
    opacity: ${props =>
      props.state === 'entering' || props.state === 'entered' ? 1 : 0};
    position: relative;
  }
`

export const Toast = styled.div`
  border-radius: ${radius.lg};
  background-color: white;
  box-shadow: ${shadow.strong};
  padding: ${space[16]};
`

Toast.propTypes = {
  persist: PropTypes.bool,
}

export const ToastContext = React.createContext()
export const ToastConsumer = ToastContext.Consumer

export function withToastContext(Component) {
  return function WrapperComponent(props) {
    return (
      <ToastConsumer>
        {stateAndHelpers => <Component {...props} {...stateAndHelpers} />}
      </ToastConsumer>
    )
  }
}

export function ToastProvider(props) {
  const [items, setItems] = React.useState([])
  const [cancellations, setCancellations] = React.useState([])

  function notify(renderCallback) {
    const component = renderCallback()
    const { persist } = component.props
    const key = performance.now()
    setItems([...items, { key, renderCallback, persist }])
  }

  function cancel(key) {
    setCancellations([...cancellations, key])
  }

  function remove(key) {
    setCancellations(cancellations.filter(i => i !== key))
    requestAnimationFrame(() => {
      setItems(items.filter(item => item.key !== key))
    })
  }

  function getStateAndHelpers() {
    return {
      notify,
    }
  }

  return (
    <ToastContext.Provider value={getStateAndHelpers()}>
      {props.children}
      <Portal>
        <ItemList on={items.length > 0}>
          {items.map(item => (
            <Item
              key={item.key}
              on={cancellations.indexOf(item.key) === -1}
              cancel={() => cancel(item.key)}
              remove={() => remove(item.key)}
              persist={item.persist}
            >
              {item.renderCallback(() => cancel(item.key))}
            </Item>
          ))}
        </ItemList>
      </Portal>
    </ToastContext.Provider>
  )
}

function ItemList({ on, children }) {
  const [, mounted] = useTransition({ in: on, timeout: duration })
  return mounted && <ItemListContainer>{children}</ItemListContainer>
}

function Item({ on, remove, cancel, persist, children }) {
  let timer = null
  const [state, mounted] = useTransition({
    in: on,
    timeout: duration,
    onEntered: () => {
      if (persist) return false
      timer = setTimeout(cancel, 3000)
    },
    onExited: () => {
      timer && clearTimeout(timer)
      remove()
    },
  })
  return mounted && <ItemContainer state={state}>{children}</ItemContainer>
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast() must be used within a ToastProvider')
  }
  return context
}
