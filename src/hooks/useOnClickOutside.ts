import { useEffect } from 'react'

export function useOnClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  handler: () => void
) {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return
        }

        handler()
      }

      // MouseEvent
      document.addEventListener('mousedown', listener)
      // TouchEvent
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // Add ref and handler to effect dependencies
    [ref, handler]
  )
}
