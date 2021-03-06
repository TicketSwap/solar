// Mock custom useTransition hook
jest.mock('../src/hooks/useTransition', () => {
  return {
    useTransition: ({ in: on }) => {
      const status = on ? 'entered' : 'exited'
      const entered = on
      const transitioning = false
      return [status, entered, transitioning]
    },
    TransitionState: {
      EXITED: 'exited',
      ENTERING: 'entering',
      ENTERED: 'entered',
      EXITING: 'exiting',
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
