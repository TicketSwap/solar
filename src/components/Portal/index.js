import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

export const Portal = ({ selector, children }) => {
  if (typeof document === 'undefined') return null
  const node = selector ? document.querySelector(selector) : document.body
  return node ? createPortal(children, node) : null
}

Portal.propTypes = {
  selector: PropTypes.string,
}
