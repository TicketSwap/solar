import React from 'react'
import { usePrevious } from './usePrevious'

export const UNMOUNTED = 'unmounted'
const MOUNTING = 'mounting'
export const MOUNTED = 'mounted'
const UNMOUNTING = 'unmounting'

export function useTransition({ on = false, duration = 500 }) {
  const [state, setState] = React.useState(UNMOUNTED)
  const [show, setShow] = React.useState(false)
  const [transitioning, setTransitioning] = React.useState(false)
  const prevOn = usePrevious(on)

  React.useEffect(() => {
    function handleMount() {
      if (transitioning) return false
      setTransitioning(true)
      setState(MOUNTING)
      function tick() {
        setState(MOUNTED)
        setTransitioning(false)
      }
      let id = setTimeout(tick, duration)
      return () => clearTimeout(id)
    }

    function handleUnmount() {
      setTransitioning(true)
      setState(UNMOUNTING)
      function tick() {
        setState(UNMOUNTED)
        setShow(false)
        setTransitioning(false)
      }
      let id = setTimeout(tick, duration)
      return () => clearTimeout(id)
    }

    if (on && !prevOn) {
      setShow(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(handleMount)
      })
    }

    if (prevOn && !on) {
      handleUnmount()
    }
  }, [on, prevOn, duration, transitioning])

  return {
    state,
    show,
    transitioning,
  }
}
