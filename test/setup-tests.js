// Mock custom useTransition hook
jest.mock('../src/hooks/useTransition', () => {
  return {
    useTransition: ({ on }) => ({
      state: 'mockedState',
      show: on,
    }),
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
