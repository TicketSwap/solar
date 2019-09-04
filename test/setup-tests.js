// Mock custom useTransition hook
jest.mock('../src/hooks/useTransition', () => {
  return {
    useTransition: ({ on }) => {
      const status = on ? 'mounted' : 'unmounted'
      const mounted = on
      const transitioning = false
      return [status, mounted, transitioning]
    },
  }
})

// Mock window.matchMedia
window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }
})
