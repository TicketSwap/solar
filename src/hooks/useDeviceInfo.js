import { isServer } from '../utils'

export function useDeviceInfo() {
  if (isServer()) return {}
  const userAgent = window.navigator.userAgent
  const isAndroid = () => Boolean(userAgent.match(/Android/i))
  const isIOS = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i))
  const isWindowsPhone = () => Boolean(userAgent.match(/IEMobile/i))
  const isMobile = () =>
    Boolean(isAndroid() || isIOS() || isOpera() || isWindowsPhone())
  const isDesktop = () => !isMobile()

  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIOS,
  }
}
