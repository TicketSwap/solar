import { useState, useCallback, useEffect, useRef } from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import { usePrevious } from '../usePrevious'

export const EXITED = 'EXITED'
export const ENTERING = 'ENTERING'
export const ENTERED = 'ENTERED'
export const EXITING = 'EXITING'

export enum TransitionState {
  EXITED = 'EXITED',
  ENTERING = 'ENTERING',
  ENTERED = 'ENTERED',
  EXITING = 'EXITING',
}

interface useTransitionParameters {
  in: boolean
  timeout: number
  defaultTransitionState?: keyof typeof TransitionState
  onExited?: Function
  onEntering?: Function
  onEntered?: Function
  onExiting?: Function
}

type DefaultTransitionState = keyof typeof TransitionState

export const useTransition = (
  props: useTransitionParameters
): [DefaultTransitionState, boolean, boolean] => {
  const {
    in: on,
    defaultTransitionState = TransitionState.EXITED,
    timeout,
    onExited = () => {},
    onEntering = () => {},
    onEntered = () => {},
    onExiting = () => {},
  } = props

  const [state, setState] = useState(defaultTransitionState)
  const [mounted, setMounted] = useState(false)

  const prevOn = usePrevious(on)
  const transitioning =
    state === TransitionState.ENTERING || state === TransitionState.EXITING

  const enteringTimerID = useRef<ReturnType<typeof setTimeout>>()
  const exitingTimerID = useRef<ReturnType<typeof setTimeout>>()
  const animationFrameID = useRef<number>()

  const handleEntered = useCallback(() => {
    setState(TransitionState.ENTERED)
    onEntered()
  }, [onEntered])

  const handleEntering = useCallback(() => {
    setState(TransitionState.ENTERING)
    onEntering()

    return setTimeout(handleEntered, timeout)
  }, [timeout, onEntering, handleEntered])

  const handleExited = useCallback(() => {
    setState(TransitionState.EXITED)
    onExited()

    setMounted(false)
  }, [onExited])

  const handleExiting = useCallback(() => {
    setState(TransitionState.EXITING)
    onExiting()

    return setTimeout(handleExited, timeout)
  }, [onExiting, handleExited, timeout])

  useIsomorphicLayoutEffect(() => {
    if (state === TransitionState.EXITING) return

    if (!on && typeof enteringTimerID.current !== 'undefined') {
      clearTimeout(enteringTimerID.current)
    }

    if (on && !prevOn) {
      setMounted(true)

      animationFrameID.current = requestAnimationFrame(() => {
        enteringTimerID.current = handleEntering()
      })
    }

    if (prevOn && !on) {
      exitingTimerID.current = handleExiting()
    }
  }, [on, prevOn, handleEntering, transitioning, handleExiting, state])

  useEffect(() => {
    return () => {
      if (typeof enteringTimerID.current !== 'undefined')
        clearTimeout(enteringTimerID.current)
      if (typeof exitingTimerID.current !== 'undefined')
        clearTimeout(exitingTimerID.current)
      if (typeof animationFrameID.current !== 'undefined')
        cancelAnimationFrame(animationFrameID.current)
    }
  }, [])

  return [state, mounted, transitioning]
}
