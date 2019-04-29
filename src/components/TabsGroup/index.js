import React from 'react'
import PropTypes from 'prop-types'
import { callAll } from '../../utils'
import { Transition, animated } from 'react-spring'
import { easingFunctions } from '../../theme'

export const AnimatedTabPanels = ({
  items,
  activeIndex,
  previousIndex,
  getPanelProps,
}) => (
  <Transition
    native
    items={items}
    keys={item => item.component}
    initial={{ x: 0 }}
    from={{
      opacity: 0,
      x: previousIndex < activeIndex ? 16 : -16,
    }}
    enter={{ opacity: 1, x: 0 }}
    leave={{
      opacity: 0,
      position: 'absolute',
      x: previousIndex < activeIndex ? -16 : 16,
      width: '100%',
      zIndex: 0,
      pointerEvents: 'none',
    }}
    config={{
      duration: 400,
      easing: easingFunctions.easeOutCubic,
    }}
  >
    {({ title, component: Component }) => ({ x, ...props }) => (
      <animated.div
        key={Component}
        style={{
          transform: x.interpolate(val => `translate3d(${val}rem,0,0)`),
          ...props,
        }}
      >
        <Component key={title} {...getPanelProps()} />
      </animated.div>
    )}
  </Transition>
)

export class TabsGroup extends React.Component {
  static propTypes = {
    initialIndex: PropTypes.number,
    activeIndex: PropTypes.number,
    onToggle: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
  }

  static defaultProps = {
    initialIndex: 0,
    onToggle: () => {},
  }

  isOnControlled() {
    return this.props.activeIndex !== undefined
  }

  getActiveIndex(state = this.state) {
    return this.isOnControlled() ? this.props.activeIndex : state.activeIndex
  }

  setActiveIndexState = state => {
    if (this.isOnControlled()) {
      this.props.onToggle(state, this.getStateAndHelpers())
    } else {
      this.setState(
        prevState => ({
          activeIndex: state,
          previousIndex: prevState.activeIndex,
        }),
        () => {
          this.props.onToggle(this.getActiveIndex(), this.getStateAndHelpers())
        }
      )
    }
  }

  select = this.setActiveIndexState.bind(this)

  getButtonProps = (props = {}) => ({
    ...props,
    onClick: callAll(props.onClick, this.select),
  })

  getPanelContainerProps = (props = {}) => ({
    ...props,
    activeIndex: this.getActiveIndex(),
    previousIndex: this.state.previousIndex,
    getPanelProps: this.getPanelProps,
    select: this.select,
  })

  getPanelProps = (props = {}) => ({
    ...props,
    select: this.select,
  })

  state = {
    activeIndex: this.getActiveIndex({ activeIndex: this.props.initialIndex }),
    previousIndex: null,
  }

  getStateAndHelpers() {
    return {
      activeIndex: this.getActiveIndex(),
      previousIndex: this.state.previousIndex,
      getButtonProps: this.getButtonProps,
      getPanelProps: this.getPanelProps,
      select: this.select,
      getPanelContainerProps: this.getPanelContainerProps,
    }
  }

  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}
