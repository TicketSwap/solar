import React from 'react'
import styled from '@emotion/styled'
import { easing } from '../../theme'
import { usePrevious, useTransition } from '../../hooks'

const duration = 400

const Container = styled.div`
  position: relative;
  overflow: ${props => (props.transitioning ? 'hidden' : 'visible')};
`

const SlideContainer = styled.div`
  width: 100%;
  top: 0;
  z-index: ${props => (props.state === 'unmounting' ? 0 : 1)};
  position: ${props =>
    props.state === 'unmounting' ? 'absolute' : 'relative'};
  opacity: ${props =>
    props.state === 'mounting' || props.state === 'mounted' ? 1 : 0};
  transform: ${props => {
    switch (props.state) {
      case 'unmounted':
        return `translate3d(${props.initial ? 0 : props.from},0,0)`
      case 'unmounting':
        return `translate3d(${props.to},0,0)`
      default:
        return 'translate3d(0,0,0)'
    }
  }};
  transition-duration: ${duration}ms;
  transition-timing-function: ${easing.easeOutCubic};
  transition-property: opacity, transform;
`

function Slide({ active, children, setTransitioning, ...props }) {
  const [state, show, transitioning] = useTransition({ on: active, duration })

  React.useEffect(() => {
    setTransitioning(transitioning)
  }, [transitioning, setTransitioning])

  return (
    <>
      {show && (
        <SlideContainer state={state} {...props}>
          {children}
        </SlideContainer>
      )}
    </>
  )
}

const compareSlide = function(prevProps, nextProps) {
  return prevProps.active === nextProps.active
}

const MemoizedSlide = React.memo(Slide, compareSlide)

function Component({ children, onChange, activeView }) {
  const [transitioning, setTransitioning] = React.useState(false)
  const activeIndex = children.findIndex(item => item.key === activeView)
  const previousIndex = usePrevious(activeIndex)

  React.useEffect(() => {
    onChange(children[activeIndex])
  }, [children, onChange, activeIndex])

  return (
    <Container transitioning={transitioning}>
      {children.map(child => (
        <MemoizedSlide
          key={child.key}
          active={child.key === activeView}
          initial={typeof previousIndex === 'undefined'}
          from={previousIndex < activeIndex ? '2rem' : '-2rem'}
          to={previousIndex < activeIndex ? '-2rem' : '2rem'}
          setTransitioning={setTransitioning}
        >
          {child}
        </MemoizedSlide>
      ))}
    </Container>
  )
}

const compareComponent = function(prevProps, nextProps) {
  return prevProps.activeView === nextProps.activeView
}

export const ContentTransition = React.memo(Component, compareComponent)
