import { isServer } from './'

describe('isServer()', () => {
  let windowSpy: jest.SpyInstance

  beforeEach(() => {
    windowSpy = jest.spyOn(global, 'window', 'get')
  })

  afterEach(() => {
    windowSpy.mockRestore()
  })

  it('returns false when window.document is defined', () => {
    windowSpy.mockImplementation(() => ({
      document: {},
    }))

    expect(isServer()).toBe(false)
  })

  it('returns true when window is not defined', () => {
    windowSpy.mockImplementation(() => undefined)
    expect(isServer()).toBe(true)
  })

  it('returns true when window.document is not defined', () => {
    windowSpy.mockImplementation(() => ({
      document: null,
    }))

    expect(isServer()).toBe(true)
  })
})
