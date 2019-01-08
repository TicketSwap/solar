export default ({ children, to }) => {
  const props = {}

  for (const key in to) {
    props[key] = {
      interpolate: jest.fn(),
    }
  }

  return children(props)
}
