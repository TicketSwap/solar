import { useIsMounted } from './'
import { renderHook } from '@testing-library/react-hooks'

describe('useIsMounted', () => {
  describe('when component is mounted', () => {
    it('returns is mounted as true', async () => {
      const { result } = renderHook(() => useIsMounted())

      expect(result.current()).toBe(true)
    })
  })

  describe('when component unmounts', () => {
    it('returns is mounted as false', async () => {
      const { result, unmount } = renderHook(() => useIsMounted())

      expect(result.current()).toBe(true)

      unmount()

      expect(result.current()).toBe(false)
    })
  })
})
