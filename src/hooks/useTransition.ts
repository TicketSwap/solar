import React from 'react'
import { usePrevious } from './usePrevious'

export const EXITED = 'exited'
export const ENTERING = 'entering'
export const ENTERED = 'entered'
export const EXITING = 'exiting'

export enum TransitionState {
  EXITED = 'exited',
  ENTERING = 'entering',
  ENTERED = 'entered',
  EXITING = 'exiting',
}

interface useTransitionParameters {
  in: boolean
  timeout: number
  defaultTransitionState?: TransitionState
  onExited?: Function
  onEntering?: Function
  onEntered?: Function
  onExiting?: Function
}

export function useTransition({
  in: on,
  defaultTransitionState = TransitionState.EXITED,
  timeout,
  onExited,
  onEntering,
  onEntered,
  onExiting,
}: useTransitionParameters): [TransitionState, boolean, boolean] {
  if (typeof on !== 'boolean') throwError('in')
  if (typeof timeout !== 'number') throwError('timeout')
  const [state, setState] = React.useState(defaultTransitionState)
  const [mounted, setMounted] = React.useState(false)
  const [transitioning, setTransitioning] = React.useState(false)
  const prevOn = usePrevious(on)

  const handleEntered = React.useCallback(() => {
    setState(TransitionState.ENTERED)
    if (typeof onEntered === 'function') onEntered()
    setTransitioning(false)
  }, [onEntered])

  const handleEntering = React.useCallback(() => {
    if (transitioning) return false
    setTransitioning(true)
    setState(TransitionState.ENTERING)
    if (typeof onEntering === 'function') onEntering()
    let id = setTimeout(handleEntered, timeout)
    return () => clearTimeout(id)
  }, [timeout, transitioning, onEntering, handleEntered])

  const handleExited = React.useCallback(() => {
    setState(TransitionState.EXITED)
    if (typeof onExited === 'function') onExited()
    setTransitioning(false)
    setMounted(false)
  }, [onExited])

  const handleExiting = React.useCallback(() => {
    setTransitioning(true)
    setState(TransitionState.EXITING)
    if (typeof onExiting === 'function') onExiting()
    let id = setTimeout(handleExited, timeout)
    return () => clearTimeout(id)
  }, [timeout, handleExited, onExiting])

  React.useEffect(() => {
    if (on && !prevOn) {
      setMounted(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(handleEntering)
      })
    }

    if (prevOn && !on) {
      handleExiting()
    }
  }, [on, prevOn, timeout, transitioning, handleEntering, handleExiting])

  return [state, mounted, transitioning]
}

function throwError(arg: string) {
  throw new Error(
    `The useTransition hook is missing the required argument \`${arg}\`.`
  )
}
