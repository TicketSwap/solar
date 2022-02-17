import { useState, useCallback, useEffect, useRef } from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import { usePrevious } from '../usePrevious'

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

export const useTransition = ({
  in: on,
  defaultTransitionState = TransitionState.EXITED,
  timeout,
  onExited = () => {},
  onEntering = () => {},
  onEntered = () => {},
  onExiting = () => {},
}: useTransitionParameters): [TransitionState, boolean, boolean] => {
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
    if (transitioning) return

    if (on && !prevOn) {
      setMounted(true)

      animationFrameID.current = requestAnimationFrame(() => {
        enteringTimerID.current = handleEntering()
      })
    }

    if (prevOn && !on) {
      exitingTimerID.current = handleExiting()
    }
  }, [on, prevOn, handleEntering, transitioning, handleExiting])

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
