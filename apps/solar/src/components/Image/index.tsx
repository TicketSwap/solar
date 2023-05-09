import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { color, transition, duration, radius } from '../../theme'
import { fetchImage } from './fetchImage'

export interface ImageProps {
  src: string
  lazyload?: boolean
  width?: number
  height?: number
  rounded?: boolean
  alt: string
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

interface StyledContainerProps {
  rounded: boolean
}

const Container = styled.div<StyledContainerProps>`
  position: relative;
  line-height: 0;
  overflow: hidden;
  border-radius: ${props => (props.rounded ? radius.lg : 0)};
  animation-duration: ${duration}ms;
  animation-fill-mode: both;
  animation-name: ${fadeIn};
  backface-visibility: hidden;
`

interface StyledImageProps {
  show: boolean
}

const Placeholder = styled.img<StyledImageProps>`
  vertical-align: middle;
  transition: opacity ${transition};
  background-color: ${color.elevatedBackground};
  opacity: ${props => (props.show ? 0 : 1)};
  inline-size: 100%;
  block-size: 100%;
`

const StyledImage = styled.img<StyledImageProps>`
  inline-size: 100%;
  block-size: 100%;
  vertical-align: middle;
  transition: opacity ${transition};
  opacity: ${props => (props.show ? 1 : 0)};
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  object-fit: cover;
`

function placeholderSrc(width: number, height: number) {
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`
}

export const Image: React.FC<ImageProps> = ({
  src,
  lazyload = true,
  width = 1200,
  height = 800,
  rounded = false,
  alt,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(placeholderSrc(width, height))
  const imageRef = useRef<HTMLImageElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  const handleLoad = useCallback(async () => {
    try {
      await fetchImage(src)

      setLoaded(true)
      setImageSrc(src)
    } catch (error) {
      setLoaded(true)
      setImageSrc(placeholderSrc(width, height))
    }
  }, [height, src, width])

  const handleLazyLoad = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries && entries.length && entries[0].intersectionRatio > 0) {
        if (imageRef.current !== null && observer.current !== null) {
          handleLoad()
          observer.current.unobserve(imageRef.current)
        }
      }
    },
    [handleLoad]
  )

  const initObserver = useCallback(() => {
    if (!lazyload) return false

    const config = {
      root: null, // Specifying `null` watches the document’s viewport
      rootMargin: '-10px',
      threshold: 0.01,
    }

    if (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype &&
      imageRef.current !== null
    ) {
      observer.current = new IntersectionObserver(handleLazyLoad, config)
      observer.current.observe(imageRef.current)
    } else {
      handleLoad()
    }
    return
  }, [handleLazyLoad, handleLoad, lazyload])

  useEffect(() => {
    initObserver()

    return () => {
      if (observer.current !== null) {
        observer.current.disconnect()
      }
    }
  }, [initObserver, observer])

  useEffect(() => {
    setLoaded(false)
    setImageSrc(placeholderSrc(width, height))

    initObserver()
  }, [height, initObserver, src, width])

  useEffect(() => {
    if (!Boolean(observer.current)) {
      initObserver()
    }
  }, [initObserver, lazyload, observer])

  return (
    <Container rounded={rounded} {...props} role="img" aria-label={alt}>
      <Placeholder
        src={placeholderSrc(width, height)}
        aria-hidden="true"
        alt="Placeholder image"
        show={loaded}
      />
      <StyledImage src={imageSrc} ref={imageRef} show={loaded} alt={alt} />
    </Container>
  )
}
