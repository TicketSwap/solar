import React, { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'

type PortalProps = {
  children: ReactNode
}

export const Portal: React.FC<PortalProps> = ({ children }) => {
  let mountNode = React.useRef<HTMLDivElement | null>(null)
  let portalNode = React.useRef<HTMLElement | null>(null)
  let [, dispatch] = React.useState<{}>(Object.create(null))
  const forceUpdate = React.useCallback(() => {
    dispatch(Object.create(null))
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (!mountNode.current) return
    // It's possible that the content of the portal has, itself, been portaled.
    // In that case, it's important to append to the correct document element.
    const ownerDocument = mountNode.current.ownerDocument
    portalNode.current = ownerDocument?.createElement('ticketswap-portal')

    if (!portalNode.current) return

    ownerDocument.body.appendChild(portalNode.current)
    forceUpdate()

    return () => {
      if (portalNode.current && portalNode.current.ownerDocument) {
        portalNode.current.ownerDocument.body.removeChild(portalNode.current)
      }
    }
  }, [forceUpdate])

  return portalNode.current ? (
    createPortal(children, portalNode.current)
  ) : (
    <span ref={mountNode} />
  )
}
