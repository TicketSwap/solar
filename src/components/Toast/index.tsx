import React, { ReactNode, useCallback, useMemo, useRef } from 'react'
import styled from '@emotion/styled'
import { Portal } from '../Portal'
import { space, shadow, device, radius, easing, color } from '../../theme'
import { useTransition, TransitionState, useIsMounted } from '../../hooks'
import { css } from '@emotion/react'

const duration = 400

export enum ToastDisplayLength {
  persistent = 'persistent',
  short = 'short',
  long = 'long',
}

const ItemListContainer = styled.ul`
  position: fixed;
  inset-inline-start: 0;
  inset-block-end: 0;
  inline-size: ${space[512]};
  max-inline-size: 100%;
  flex-direction: column-reverse;
  pointer-events: none;
  z-index: 2147483646; /* largest accepted z-index value as integer minus 1 */

  @media ${device.tablet} {
    inset-inline-start: ${space[16]};
    inset-block-end: ${space[16]};
  }
`

export interface ToastProps {
  displayLength?: keyof typeof ToastDisplayLength
  leftAdornment?: ReactNode
  children: ReactNode
}

export const Toast: React.FC<ToastProps> = ({
  children,
  leftAdornment,
  displayLength = ToastDisplayLength.short,
  ...props
}) => <div {...props}>{children}</div>

const LeftAdornmentContainer = styled.span`
  line-height: 0;
  margin-block-start: 3px;
`

export interface ToastBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  hasLeftAdornment: boolean
  hasMultipleLines: boolean
}

const ToastContainer = styled.div<ToastBlockProps>`
  border-radius: ${radius.lg};
  background-color: ${color.invertedBackground};
  box-shadow: ${shadow.strong};
  padding-block: ${space[16]};
  padding-inline: ${space[16]};

  ${({ hasLeftAdornment, hasMultipleLines }) =>
    hasLeftAdornment &&
    css`
      display: grid;
      gap: ${space[8]};
      grid-template-columns: auto 1fr;
      align-items: ${hasMultipleLines ? 'start' : 'center'};
    `}
`
const ToastText = styled.span`
  color: ${color.invertedForeground};
`

interface ItemContainerStyles {
  state: keyof typeof TransitionState
}

const ItemContainer = styled.li<ItemContainerStyles>`
  position: absolute;
  inline-size: 100%;
  pointer-events: auto;
  padding-block: 0 ${space[16]};
  padding-inline: ${space[16]};
  opacity: 0;
  transform: ${props =>
    props.state === TransitionState.ENTERING ||
    props.state === TransitionState.ENTERED
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
      props.state === TransitionState.ENTERING ||
      props.state === TransitionState.ENTERED
        ? 0.6
        : 0};
    transform: translate3d(0, -1.2rem, 0) scale(0.96);
  }

  &:nth-last-of-type(2) {
    opacity: ${props =>
      props.state === TransitionState.ENTERING ||
      props.state === TransitionState.ENTERED
        ? 0.8
        : 0};
    transform: translate3d(0, -0.6rem, 0) scale(0.98);
  }

  &:last-of-type {
    opacity: ${props =>
      props.state === TransitionState.ENTERING ||
      props.state === TransitionState.ENTERED
        ? 1
        : 0};
    position: relative;
  }
`

export const ToastContext = React.createContext({
  notify: (_renderCallback: (_?: (event?: any) => void) => any) => {},
})
export const ToastConsumer = ToastContext.Consumer

export function withToastContext(Component: React.ComponentType) {
  return function WrapperComponent(props: any) {
    return (
      <ToastConsumer>
        {stateAndHelpers => <Component {...props} {...stateAndHelpers} />}
      </ToastConsumer>
    )
  }
}

interface ItemStateProps {
  key: number
  renderCallback: any
  displayLength: keyof typeof ToastDisplayLength
  leftAdornment?: ReactNode
}

type ToastProviderProps = {
  children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const isMounted = useIsMounted()
  const [items, setItems] = React.useState<ItemStateProps[]>([])
  const [cancellations, setCancellations] = React.useState<number[]>([])

  const notify = useCallback(
    (renderCallback: (_?: (event?: any) => void) => any) => {
      if (!isMounted()) return

      const component = renderCallback()
      const { displayLength, leftAdornment } = component.props
      const key = performance.now()
      setItems(prevItems => [
        ...prevItems,
        { key, renderCallback, displayLength, leftAdornment },
      ])
    },
    [isMounted]
  )

  function cancel(key: number) {
    setCancellations([...cancellations, key])
  }

  function remove(key: number) {
    setCancellations(cancellations.filter(i => i !== key))
    requestAnimationFrame(() => {
      setItems(items.filter(item => item.key !== key))
    })
  }

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Portal>
        <ItemList on={items.length > 0}>
          {items.map(item => (
            <Item
              key={item.key}
              on={cancellations.indexOf(item.key) === -1}
              cancel={() => cancel(item.key)}
              remove={() => remove(item.key)}
              displayLength={item.displayLength}
              leftAdornment={item.leftAdornment}
            >
              {item.renderCallback(() => cancel(item.key))}
            </Item>
          ))}
        </ItemList>
      </Portal>
    </ToastContext.Provider>
  )
}

export interface ItemListProps {
  on: boolean
  children: ReactNode
}

function ItemList({ on, children }: ItemListProps) {
  const [, mounted] = useTransition({ in: on, timeout: duration })
  if (!mounted) return null
  return <ItemListContainer>{children}</ItemListContainer>
}

export interface ItemProps {
  on: boolean
  remove: () => void
  cancel: () => void
  displayLength: keyof typeof ToastDisplayLength
  leftAdornment?: ReactNode
  children: ReactNode
}

function Item({
  on,
  remove,
  cancel,
  displayLength,
  leftAdornment,
  children,
}: ItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  let timer: NodeJS.Timeout | null = null
  const [state, mounted] = useTransition({
    in: on,
    timeout: duration,
    onEntered: () => {
      if (displayLength === ToastDisplayLength.persistent) return

      const delay = displayLength === ToastDisplayLength.long ? 5000 : 3000

      timer = setTimeout(cancel, delay)
    },
    onExited: () => {
      timer && clearTimeout(timer)
      remove()
    },
  })
  if (!mounted) return null

  // If toast has multiple lines in one of it's children the left adornment should be aligned to the top-left.
  // If there is one line only it should align in the center (vertically).
  const hasMultipleLines = ref.current
    ? ref.current.getBoundingClientRect().height > 76
    : false

  return (
    <ItemContainer state={state}>
      <ToastContainer
        hasLeftAdornment={Boolean(leftAdornment)}
        hasMultipleLines={hasMultipleLines}
        ref={ref}
      >
        <LeftAdornmentContainer>{leftAdornment}</LeftAdornmentContainer>
        <ToastText>{children}</ToastText>
      </ToastContainer>
    </ItemContainer>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast() must be used within a ToastProvider')
  }
  return context
}
