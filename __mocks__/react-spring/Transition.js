import React from 'react'

export default ({ items, keys, children, enter }) => {
  if (Array.isArray(items)) {
    return items.length > 0
      ? items.map(item => <div key={keys(item)}>{children(item)(enter)}</div>)
      : null
  } else {
    return items ? children(items)(enter) : null
  }
}
