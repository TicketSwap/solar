import React from 'react'
import { Transition, animated } from 'react-spring'
import { easingFunctions } from '../../theme'
import { usePrevious } from '../../hooks'

export function ContentTransition({ children, onChange, activeView }) {
  const activeIndex = children.findIndex(item => item.key === activeView)
  const previousIndex = usePrevious(activeIndex)

  React.useEffect(() => {
    onChange(children[activeIndex])
  }, [children, onChange, activeIndex])

  return (
    <Transition
      native
      items={children[activeIndex]}
      keys={item => item.key}
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
      {item => ({ x, ...styles }) => (
        <animated.div
          key={item}
          style={{
            transform: x.interpolate(val => `translate3d(${val}rem,0,0)`),
            ...styles,
          }}
        >
          {item}
        </animated.div>
      )}
    </Transition>
  )
}
