import React from 'react'
import { usePrevious } from './usePrevious'

const EXITED = 'exited'
const ENTERING = 'entering'
const ENTERED = 'entered'
const EXITING = 'exiting'

export function useTransition({ in: on, timeout }) {
  if (typeof on !== 'boolean') throwError('in')
  if (typeof timeout !== 'number') throwError('timeout')
  const [state, setState] = React.useState(EXITED)
  const [mounted, setMounted] = React.useState(false)
  const [transitioning, setTransitioning] = React.useState(false)
  const prevOn = usePrevious(on)

  function handleEntered() {
    setState(ENTERED)
    setTransitioning(false)
  }

  const handleEntering = React.useCallback(() => {
    if (transitioning) return false
    setTransitioning(true)
    setState(ENTERING)
    let id = setTimeout(handleEntered, timeout)
    return () => clearTimeout(id)
  }, [timeout, transitioning])

  function handleExited() {
    setState(EXITED)
    setTransitioning(false)
    setMounted(false)
  }

  const handleExiting = React.useCallback(() => {
    setTransitioning(true)
    setState(EXITING)
    let id = setTimeout(handleExited, timeout)
    return () => clearTimeout(id)
  }, [timeout])

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

function throwError(arg) {
  throw new Error(
    `The useTransition hook is missing the required argument \`${arg}\`.`
  )
}
