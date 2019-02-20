import React from 'react'

export default ({ items, keys, children, enter, native }) => {
  // Prepare object with `interpolate()` fn for each property,
  // in case the component is called with the native prop:
  // `<Transition native />`
  const props = {}
  for (const key in enter) {
    props[key] = {
      interpolate: jest.fn(),
    }
  }

  if (Array.isArray(items)) {
    return items.length > 0
      ? items.map(item => (
          <div key={keys(item)}>{children(item)(native ? props : enter)}</div>
        ))
      : null
  } else {
    return items ? children(items)(native ? props : enter) : null
  }
}
