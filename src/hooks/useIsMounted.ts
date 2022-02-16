import { useRef, useEffect } from 'react'

export const useIsMounted = (): boolean => {
  const isMounted = useRef<boolean>(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted.current
}
