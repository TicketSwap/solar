import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

function canUseDOM() {
  return Boolean(
    typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
  )
}

export const Portal = ({ selector, children }) => {
  if (!canUseDOM()) return null
  const node = selector ? document.querySelector(selector) : document.body
  return node ? createPortal(children, node) : null
}

Portal.propTypes = {
  selector: PropTypes.string,
}
