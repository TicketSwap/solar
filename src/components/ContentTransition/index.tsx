import React, { ReactElement, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { easing } from '../../theme'
import { TransitionState, usePrevious, useTransition } from '../../hooks'

const duration = 400

const Container = styled.div`
  position: relative;
`

interface SlideContainerProps {
  state: keyof typeof TransitionState
  from: string
  to: string
  initial: boolean
}

const SlideContainer = styled.div<SlideContainerProps>`
  width: 100%;
  top: 0;
  position: ${props =>
    props.state === TransitionState.EXITING ? 'absolute' : 'relative'};
  opacity: ${props =>
    props.state === TransitionState.ENTERING ||
    props.state === TransitionState.ENTERED
      ? 1
      : 0};
  transform: ${props => {
    switch (props.state) {
      case TransitionState.EXITED:
        return `translate3d(${props.initial ? 0 : props.from},0,0)`
      case TransitionState.EXITING:
        return `translate3d(${props.to},0,0)`
      default:
        return 'translate3d(0,0,0)'
    }
  }};
  transition-duration: ${duration}ms;
  transition-timing-function: ${easing.easeOutCubic};
  transition-property: opacity, transform;
  /* Make sure the exiting slide doesn’t reach outside the dialog */
  overflow: ${props =>
    props.state === TransitionState.EXITING ? 'hidden' : 'visible'};
  bottom: ${props => (props.state === TransitionState.EXITING ? 0 : 'auto')};
`

export interface SlideProps {
  active: boolean
  children: ReactElement
  initialActiveIndex: number
  initialPreviousIndex?: number
}

function Slide({
  active,
  children,
  initialActiveIndex,
  initialPreviousIndex,
}: SlideProps) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)
  const [previousIndex, setPreviousIndex] = useState(initialPreviousIndex)
  const [state, mounted] = useTransition({
    in: active,
    timeout: duration,
  })

  useEffect(() => {
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
          from={previousIndex && previousIndex < activeIndex ? '2rem' : '-2rem'}
          to={previousIndex && previousIndex < activeIndex ? '-2rem' : '2rem'}
          initial={typeof previousIndex === 'undefined'}
        >
          {children}
        </SlideContainer>
      )}
    </>
  )
}

export interface ContentTransitionProps {
  children: ReactElement[]
  activeView: string
  onChange?: (child: ReactElement) => void
}

export function ContentTransition({
  children,
  onChange = () => null,
  activeView,
}: ContentTransitionProps) {
  const activeIndex = children.findIndex(item => item.key === activeView)
  const previousIndex = usePrevious(activeIndex)

  useEffect(() => {
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
