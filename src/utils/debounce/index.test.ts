import { debounce } from '.'

describe('debounce()', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe('when it is triggered', () => {
    it('execute just once', () => {
      const fn = jest.fn()
      const resetQuery = debounce(fn, 1000)

      resetQuery()
      resetQuery()

      jest.runAllTimers()

      expect(fn).toBeCalledTimes(1)
    })
  })

  describe('when it is canceled', () => {
    it('does not execute', () => {
      const fn = jest.fn()
      const resetQuery = debounce(fn, 1000)

      resetQuery()
      resetQuery.cancel()

      jest.runAllTimers()

      expect(fn).toBeCalledTimes(0)
    })
  })
})
