import { useRef, useEffect, useCallback } from 'react'

export const useIsMounted = (): (() => boolean) => {
  const isMountedRef = useRef(true)
  const isMounted = useCallback(() => isMountedRef.current, [])

  useEffect(() => {
    isMountedRef.current = true

    return () => void (isMountedRef.current = false)
  }, [])

  return isMounted
}
