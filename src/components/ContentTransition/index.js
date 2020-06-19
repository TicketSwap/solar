import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { easing } from '../../theme'
import { usePrevious, useTransition } from '../../hooks'

const duration = 400

const Container = styled.div`
  position: relative;
`

const SlideContainer = styled.div`
  width: 100%;
  top: 0;
  z-index: ${props => (props.state === 'exiting' ? 0 : 1)};
  position: ${props => (props.state === 'exiting' ? 'absolute' : 'relative')};
  opacity: ${props =>
    props.state === 'entering' || props.state === 'entered' ? 1 : 0};
  transform: ${props => {
    switch (props.state) {
      case 'exited':
        return `translate3d(${props.initial ? 0 : props.from},0,0)`
      case 'exiting':
        return `translate3d(${props.to},0,0)`
      default:
        return 'translate3d(0,0,0)'
    }
  }};
  transition-duration: ${duration}ms;
  transition-timing-function: ${easing.easeOutCubic};
  transition-property: opacity, transform;
  /* Make sure the exiting slide doesn’t reach outside the dialog */
  overflow: ${props => (props.state === 'exiting' ? 'hidden' : 'visible')};
  bottom: ${props => (props.state === 'exiting' ? 0 : 'auto')};
`

function Slide({ active, children, initialActiveIndex, initialPreviousIndex }) {
  const [activeIndex, setActiveIndex] = React.useState(initialActiveIndex)
  const [previousIndex, setPreviousIndex] = React.useState(initialPreviousIndex)
  const [state, mounted] = useTransition({
    in: active,
    timeout: duration,
  })

  React.useEffect(() => {
    if (initialActiveIndex !== initialPreviousIndex) {
      setActiveIndex(initialActiveIndex)
      setPreviousIndex(initialPreviousIndex)
    }
  }, [initialActiveIndex, initialPreviousIndex])

  return (
    <>
      {mounted && (
        <SlideContainer
          state={state}
          from={previousIndex < activeIndex ? '2rem' : '-2rem'}
          to={previousIndex < activeIndex ? '-2rem' : '2rem'}
          initial={typeof previousIndex === 'undefined'}
        >
          {children}
        </SlideContainer>
      )}
    </>
  )
}

export function ContentTransition({ children, onChange, activeView }) {
  const activeIndex = children.findIndex(item => item.key === activeView)
  const previousIndex = usePrevious(activeIndex)

  React.useEffect(() => {
    onChange(children[activeIndex])
  }, [children, onChange, activeIndex])

  return (
    <Container>
      {children.map(child => (
        <Slide
          key={child.key}
          active={child.key === activeView}
          initialActiveIndex={activeIndex}
          initialPreviousIndex={previousIndex}
        >
          {child}
        </Slide>
      ))}
    </Container>
  )
}

ContentTransition.propTypes = {
  activeView: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
