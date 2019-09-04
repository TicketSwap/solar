import React from 'react'
import { usePrevious } from './usePrevious'

const UNMOUNTED = 'unmounted'
const MOUNTING = 'mounting'
const MOUNTED = 'mounted'
const UNMOUNTING = 'unmounting'

export function useTransition({ on, duration }) {
  if (typeof on !== 'boolean') throwError('on')
  if (typeof duration !== 'number') throwError('duration')
  const [status, setStatus] = React.useState(UNMOUNTED)
  const [mounted, setMounted] = React.useState(false)
  const [transitioning, setTransitioning] = React.useState(false)
  const prevOn = usePrevious(on)

  function handleMounted() {
    setStatus(MOUNTED)
    setTransitioning(false)
  }

  const handleMounting = React.useCallback(() => {
    if (transitioning) return false
    setTransitioning(true)
    setStatus(MOUNTING)
    let id = setTimeout(handleMounted, duration)
    return () => clearTimeout(id)
  }, [duration, transitioning])

  function handleUnmounted() {
    setStatus(UNMOUNTED)
    setTransitioning(false)
    setMounted(false)
  }

  const handleUnmounting = React.useCallback(() => {
    setTransitioning(true)
    setStatus(UNMOUNTING)
    let id = setTimeout(handleUnmounted, duration)
    return () => clearTimeout(id)
  }, [duration])

  React.useEffect(() => {
    if (on && !prevOn) {
      setMounted(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(handleMounting)
      })
    }

    if (prevOn && !on) {
      handleUnmounting()
    }
  }, [on, prevOn, duration, transitioning, handleMounting, handleUnmounting])

  return [status, mounted, transitioning]
}

function throwError(arg) {
  throw new Error(
    `The useTransition hook is missing the required argument \`${arg}\`.`
  )
}
