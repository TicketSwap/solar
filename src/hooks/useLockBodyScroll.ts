import { useIsomorphicLayoutEffect as useLayoutEffect_SAFE_FOR_SSR } from '@reach/utils'

const isIosDevice =
  typeof window !== 'undefined' &&
  window.navigator &&
  window.navigator.platform &&
  /iP(ad|hone|od)/.test(window.navigator.platform)

let initialClientY = -1
let previousBodyOverflowSetting: string | undefined
let previousBodyPaddingRight: string | undefined

interface lockBodyScrollOptions {
  reserveScrollBarGap: boolean
}

const lockBodyScroll = (options: lockBodyScrollOptions) => {
  if (isIosDevice) {
    initialClientY = window.pageYOffset
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${initialClientY}px`
    document.body.style.width = '100%'
  } else {
    // Setting overflow on body/documentElement synchronously in
    // Desktop Safari slows down the responsiveness for some reason.
    // Setting within a requestAnimationFrame fixes this.
    requestAnimationFrame(() => {
      // If previousBodyPaddingRight is already set, don't set it
      // again.
      if (previousBodyPaddingRight === undefined) {
        const reserveScrollBarGap =
          !!options && options.reserveScrollBarGap === true
        const scrollBarGap =
          window.innerWidth - document.documentElement.clientWidth
        if (reserveScrollBarGap && scrollBarGap > 0) {
          previousBodyPaddingRight = document.body.style.paddingRight
          document.body.style.paddingRight = `${scrollBarGap}px`
        }
      }
      // If previousBodyOverflowSetting is already set, don't set it
      // again.
      if (previousBodyOverflowSetting === undefined) {
        previousBodyOverflowSetting = document.body.style.overflow
        document.body.style.overflow = 'hidden'
      }
    })
  }
}

const restoreBodyScroll = () => {
  if (isIosDevice) {
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('position')
    document.body.style.removeProperty('top')
    document.body.style.removeProperty('width')
    window.scrollTo(0, initialClientY)
    // Reset initial clientY
    initialClientY = -1
  } else {
    requestAnimationFrame(() => {
      if (previousBodyPaddingRight !== undefined) {
        document.body.style.paddingRight = previousBodyPaddingRight
        // Restore previousBodyPaddingRight to undefined so
        // setOverflowHidden knows it can be set again.
        previousBodyPaddingRight = undefined
      }
      if (previousBodyOverflowSetting !== undefined) {
        document.body.style.overflow = previousBodyOverflowSetting
        // Restore previousBodyOverflowSetting to undefined so
        // setOverflowHidden knows it can be set again.
        previousBodyOverflowSetting = undefined
      }
    })
  }
}

export function useLockBodyScroll() {
  useLayoutEffect_SAFE_FOR_SSR(() => {
    lockBodyScroll({ reserveScrollBarGap: true })
    return () => restoreBodyScroll()
  }, [])
}
