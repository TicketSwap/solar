import { Component } from 'react'
import { device } from '../../theme'
import { debounce, callAll, clamp } from '../../utils'

export class Carousel extends Component {
  _isMounted = false
  outerContainer = null
  innerContainer = null
  prevButton = null
  nextButton = null
  initialState = {
    activeIndex: 0,
    position: 0,
    hasNext: null,
  }
  state = this.initialState

  componentDidMount() {
    this._isMounted = true
    this.hasNext()
    window.addEventListener('resize', debounce(this.handleResize, 100))
  }

  componentWillUnmount() {
    this._isMounted = false
    window.removeEventListener('resize', debounce(this.handleResize, 100))
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.prevNextButtons &&
      this.state.activeIndex !== prevState.activeIndex
    ) {
      this.centerPrevNextButtonsOnImage()
    }
  }

  centerButton = ({ button, ref }) => {
    if (!button || !ref) return false
    const { height: buttonHeight } = button.getBoundingClientRect()
    const { height: refHeight } = ref.getBoundingClientRect()
    button.style.top = `${Math.ceil(refHeight / 2 - buttonHeight / 2)}px`
  }

  centerPrevNextButtonsOnImage = () => {
    if (!this.props.prevNextButtons) return false
    // Center prev/next buttons based on image if one is available
    // TODO: Find a nicer solution for this
    const image = this.innerContainer.querySelector('img')
    const hasPrev = this.state.activeIndex !== 0
    if (hasPrev) {
      this.centerButton({
        button: this.prevButton,
        ref: image,
      })
    }
    if (this.state.hasNext) {
      this.centerButton({
        button: this.nextButton,
        ref: image,
      })
    }
  }

  setOuterContainerRef = element => (this.outerContainer = element)
  setInnerContainerRef = element => (this.innerContainer = element)
  setPrevButtonRef = element => (this.prevButton = element)
  setNextButtonRef = element => (this.nextButton = element)

  handleResize = () => {
    if (typeof window === 'undefined') return false
    if (!window.matchMedia) return false
    if (!window.matchMedia(device.tablet).matches) return false
    if (!this._isMounted) return false
    this.setState(this.initialState)
    if (!this.outerContainer) return false
    this.outerContainer.scrollLeft = 0
    if (!this.innerContainer) return false
    this.innerContainer.style.transform = ''
    this.hasNext()
  }

  hasNext = () => {
    const container = this.innerContainer
    if (!container) return false
    const containerPos = container.getBoundingClientRect()
    const children = Array.from(container.childNodes)
    const totalWidth = children
      .map(child => Math.ceil(child.getBoundingClientRect().width))
      .reduce((acc, cur) => acc + cur)
    const hasNext =
      Math.floor(totalWidth - this.state.position - containerPos.width) > 0
    this.setState({ hasNext }, this.centerPrevNextButtonsOnImage)
  }

  prev = () => {
    const { activeIndex } = this.state
    if (activeIndex === 0) return false
    this.goTo(activeIndex - 1)
  }

  next = () => {
    const { activeIndex, hasNext } = this.state
    if (!hasNext) return false
    this.goTo(activeIndex + 1)
  }

  goTo = index => {
    const container = this.innerContainer
    if (!container) return false
    const item = container.childNodes[index]
    if (!item) return false
    this.setState({ activeIndex: index })
    const containerPos = container.getBoundingClientRect()
    const itemPos = item.getBoundingClientRect()
    const deltaPos = itemPos.left - containerPos.left
    const children = Array.from(container.childNodes)
    const totalWidth = children
      .map(child => Math.ceil(child.getBoundingClientRect().width))
      .reduce((acc, cur) => acc + cur)
    const rest = Math.floor(totalWidth - deltaPos - containerPos.width)
    const newPos =
      deltaPos === 0 // If last item only partially out of view
        ? deltaPos
        : rest < itemPos.width
        ? deltaPos + rest
        : deltaPos
    this.setState({ position: newPos }, this.hasNext)
  }

  onDrag = val => {
    const container = this.innerContainer
    if (!container) return false
    const containerWidth = container.getBoundingClientRect().width
    const children = Array.from(container.childNodes)
    if (!children.length) return false
    const totalWidth = children
      .map(child => Math.ceil(child.getBoundingClientRect().width))
      .reduce((acc, cur) => acc + cur)

    this.setState(state => {
      const newPos =
        val < 0 ? state.position - Math.abs(val) : state.position + val
      return { position: clamp(newPos, 0, containerWidth - totalWidth) }
    })
  }

  getOuterContainerProps = (props = {}) => ({
    ...props,
    ref: this.setOuterContainerRef,
  })

  getInnerContainerProps = (props = {}) => ({
    ...props,
    ref: this.setInnerContainerRef,
  })

  getPrevButtonProps = (props = {}) => ({
    ...props,
    onClick: callAll(props.onClick, this.prev),
    ref: this.setPrevButtonRef,
  })

  getNextButtonProps = (props = {}) => ({
    ...props,
    onClick: callAll(props.onClick, this.next),
    ref: this.setNextButtonRef,
  })

  getStateAndHelpers() {
    return {
      getInnerContainerProps: this.getInnerContainerProps,
      getOuterContainerProps: this.getOuterContainerProps,
      getPrevButtonProps: this.getPrevButtonProps,
      getNextButtonProps: this.getNextButtonProps,
      hasPrev: this.state.activeIndex !== 0,
      hasNext: this.state.hasNext,
      onDrag: this.onDrag,
      position: this.state.position,
    }
  }

  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}
