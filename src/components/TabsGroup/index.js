import React from 'react'
import PropTypes from 'prop-types'
import { callAll } from '../../utils'

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
