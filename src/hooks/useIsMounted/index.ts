import { useRef, useEffect, useCallback } from 'react'

export const useIsMounted = (): (() => boolean) => {
  const isMountedRef = useRef(true)
  const isMounted = useCallback(() => isMountedRef.current, [])

  useEffect(() => {
    return () => void (isMountedRef.current = false)
  }, [])

  return isMounted
}
