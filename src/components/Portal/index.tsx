import { createPortal } from 'react-dom'

export interface PortalProps {
  selector?: string
}

function canUseDOM() {
  return Boolean(
    typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
  )
}

export const Portal: React.FC<PortalProps> = ({ selector, children }) => {
  if (!canUseDOM()) return null
  const node = selector ? document.querySelector(selector) : document.body
  return node ? createPortal(children, node) : null
}
