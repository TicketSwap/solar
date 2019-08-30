import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import { color, transition, duration, radius } from '../../theme'
import { fetchImage } from './fetchImage'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Container = styled.div`
  position: relative;
  line-height: 0;
  z-index: 1;
  overflow: hidden;
  background-color: ${color.stardust};
  border-radius: ${props => (props.rounded ? radius.lg : 0)};
  animation-duration: ${duration}ms;
  animation-fill-mode: both;
  animation-name: ${fadeIn};
  backface-visibility: hidden;
`

const Placeholder = styled.img`
  vertical-align: middle;
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: middle;
  transition: opacity ${transition};
  opacity: ${props => (props.show ? 1 : 0)};
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  object-fit: cover;
`

export class Image extends Component {
  constructor(props) {
    super(props)
    this.handleLoad = this.handleLoad.bind(this)
  }

  _isMounted = false
  observer = null
  initialState = {
    loaded: false,
    src: this.placeholderSrc(this.props.width, this.props.height),
  }

  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    rounded: PropTypes.bool,
  }

  static defaultProps = {
    width: 1200,
    height: 800,
    lazyLoad: true,
  }

  state = this.initialState

  setImageElementRef = element => (this.imageEl = element)

  placeholderSrc(width, height) {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`
  }

  async handleLoad() {
    const { src } = this.props
    try {
      await fetchImage(src)
      this._isMounted && this.setState({ loaded: true, src })
    } catch (error) {
      this._isMounted && this.setState({ loaded: true })
    }
  }

  handleLazyLoad = entries => {
    if (entries && entries.length && entries[0].intersectionRatio > 0) {
      if (typeof this.imageEl !== undefined) {
        this.handleLoad()
        this.observer.unobserve(this.imageEl)
      }
    }
  }

  initObserver = () => {
    if (!this.props.lazyLoad) return false

    const config = {
      root: null, // Specifying `null` watches the document’s viewport
      rootMargin: '-10px',
      threshold: 0.01,
    }

    if (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype
    ) {
      this.observer = new IntersectionObserver(this.handleLazyLoad, config)
      this.observer.observe(this.imageEl)
    } else {
      this.handleLoad()
    }
  }

  componentDidMount() {
    this._isMounted = true
    this.initObserver()
  }

  componentDidUpdate(prevProps) {
    // Reset image if `src` prop changes
    if (prevProps.src !== this.props.src) {
      this.setState(this.initialState, this.initObserver)
    }

    if (prevProps.lazyLoad !== this.props.lazyLoad && !this.observer) {
      this.initObserver()
    }
  }

  componentWillUnmount() {
    this._isMounted = false

    if (this.observer) {
      this.observer.disconnect()
    }
  }

  render() {
    const { src, alt, width, height, ...props } = this.props

    return (
      <Container {...props}>
        <Placeholder
          src={this.placeholderSrc(width, height)}
          aria-hidden="true"
          alt="Placeholder image"
        />
        <StyledImage
          src={this.state.src}
          ref={this.setImageElementRef}
          show={this.state.loaded}
          alt={alt}
        />
      </Container>
    )
  }
}
