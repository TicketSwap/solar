import React from 'react'
import styled from '@emotion/styled'
import { color } from '../../theme'
import PropTypes from 'prop-types'
import { usePrevious } from '../../hooks/usePrevious'

// Image component uses native lazy-loading when available, otherwise
// falls back to Intersection Observer. Inspired by `gatsby-image`.
// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image

function getPlaceholderSrc(width, height) {
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`
}

// Cache if we've seen an image before so we don't bother with
// lazy-loading & fading in on subsequent mounts.
const imageCache = Object.create({})
const inImageCache = src => {
  return imageCache[src] || false
}
const activateCacheForImage = src => {
  imageCache[src] = true
}

// Native lazy-loading support: https://addyosmani.com/blog/lazy-loading/
const hasNativeLazyLoadSupport =
  typeof HTMLImageElement !== 'undefined' &&
  'loading' in HTMLImageElement.prototype
const isBrowser = typeof window !== 'undefined'
const hasIOSupport = isBrowser && window.IntersectionObserver

let io
const listeners = new WeakMap()

function getIO() {
  if (
    typeof io === 'undefined' &&
    typeof window !== 'undefined' &&
    window.IntersectionObserver
  ) {
    io = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (listeners.has(entry.target)) {
            const cb = listeners.get(entry.target)
            // Edge doesn't currently support isIntersecting, so also
            // test for intersectionRatio > 0
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              io.unobserve(entry.target)
              listeners.delete(entry.target)
              cb()
            }
          }
        })
      },
      { rootMargin: '10px' }
    )
  }

  return io
}

const listenToIntersections = (el, cb) => {
  const observer = getIO()

  if (observer) {
    observer.observe(el)
    listeners.set(el, cb)
  }

  return () => {
    observer.unobserve(el)
    listeners.delete(el)
  }
}

const Container = styled.figure`
  position: relative;
  overflow: hidden;
`

const PreserveAspectRatio = styled.div`
  width: 100%;
  padding-bottom: ${props => `${100 / props.aspectRatio}%`};
`

const SolidBackgroundColor = styled.div`
  background-color: ${props => props.bgColor};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`

const Picture = styled.picture`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.shouldReveal ? 1 : 0)};
  transition: ${props =>
    props.shouldFadeIn ? `opacity ${props.fadeInDuration}ms` : 'none'};
  object-fit: cover;
  object-position: center;
`

Img.propTypes = {
  style: PropTypes.object,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
}

export function Image({
  title,
  alt,
  className,
  imageStyles = {},
  src,
  sizes,
  srcSet,
  aspectRatio,
  backgroundColor,
  fadeInDuration,
  loading,
  onStartLoad,
  onLoad,
  ...props
}) {
  const seenBefore = isBrowser && inImageCache(src)
  const isCritical = loading === 'eager'
  const useIOSupport = !hasNativeLazyLoadSupport && hasIOSupport && !isCritical
  const initialVisible =
    isCritical || (isBrowser && (hasNativeLazyLoadSupport || !useIOSupport))
  const imageRef = React.useRef()
  const [fadeIn] = React.useState(!seenBefore && props.fadeIn)
  const [isVisible, setIsVisible] = React.useState(initialVisible)
  const previouslyVisible = usePrevious(isVisible)
  const [imgLoaded, setImgLoaded] = React.useState(false)
  const [imgCached, setImgCached] = React.useState(false)
  const shouldReveal = fadeIn === false || imgLoaded
  const shouldFadeIn = fadeIn === true && !imgCached
  const cleanUpListeners = React.useRef()

  const bgColor =
    typeof backgroundColor === 'boolean' ? color.stardust : backgroundColor

  const handleImageLoaded = React.useCallback(() => {
    activateCacheForImage(src)
    setImgLoaded(true)
    if (onLoad) {
      onLoad()
    }
  }, [onLoad, src])

  React.useEffect(() => {
    if (isVisible && typeof onStartLoad === 'function') {
      onStartLoad({ wasCached: inImageCache(src) })
    }

    if (isCritical) {
      const img = imageRef.current
      if (img && img.complete) {
        handleImageLoaded()
      }
    }

    return function cleanup() {
      if (typeof cleanUpListeners.current === 'function') {
        cleanUpListeners.current()
      }
    }
  }, [
    src,
    cleanUpListeners,
    isCritical,
    isVisible,
    onStartLoad,
    handleImageLoaded,
  ])

  // Specific to IntersectionObserver based lazy-load support
  function handleRef(ref) {
    if (useIOSupport && ref) {
      cleanUpListeners.current = listenToIntersections(ref, () => {
        if (!isVisible && typeof onStartLoad === 'function') {
          onStartLoad({ wasCached: inImageCache(src) })
        }
        setIsVisible(true)
      })
    }
  }

  // imgCached and imgLoaded must update after isVisible. Once
  // isVisible is true, imageRef becomes accessible, which imgCached
  // needs access to. imgLoaded and imgCached are in a 2nd setState
  // call to be changed together, avoiding initiating unnecessary
  // animation frames from style changes.
  React.useEffect(() => {
    if (!previouslyVisible && isVisible) {
      setImgLoaded(inImageCache(src))
      // `currentSrc` should be a string, but can be `undefined` in IE
      setImgCached(Boolean(imageRef.current.currentSrc))
    }
  }, [isVisible, src, previouslyVisible])

  return (
    <Container className={className} ref={handleRef}>
      <PreserveAspectRatio aspectRatio={aspectRatio} />

      {bgColor && <SolidBackgroundColor title={title} bgColor={bgColor} />}

      <Picture>
        <Img
          alt={alt}
          title={title}
          src={isVisible ? src : getPlaceholderSrc(props.width, props.height)}
          sizes={isVisible ? sizes : null}
          srcSet={isVisible ? srcSet : null}
          onLoad={isVisible ? handleImageLoaded : null}
          onError={isVisible ? props.onError : null}
          crossOrigin={props.crossOrigin}
          style={imageStyles}
          ref={imageRef}
          loading={loading}
          shouldReveal={shouldReveal}
          shouldFadeIn={shouldFadeIn}
          fadeInDuration={fadeInDuration}
          {...props}
        />
      </Picture>
    </Container>
  )
}

Image.defaultProps = {
  fadeIn: true,
  fadeInDuration: 500,
  alt: '',
  loading: 'lazy',
  width: 300,
  height: 200,
  aspectRatio: 300 / 200,
  backgroundColor: true,
}

Image.propTypes = {
  fadeIn: PropTypes.bool,
  fadeInDuration: PropTypes.number,
  title: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  critical: PropTypes.bool,
  crossOrigin: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  style: PropTypes.object,
  imageStyles: PropTypes.object,
  placeholderStyle: PropTypes.object,
  placeholderClassName: PropTypes.string,
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onStartLoad: PropTypes.func,
  itemProp: PropTypes.string,
  loading: PropTypes.oneOf(['auto', 'lazy', 'eager']),
  draggable: PropTypes.bool,
}
