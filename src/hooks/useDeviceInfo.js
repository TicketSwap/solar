import { isServer } from '../utils'

export function useDeviceInfo() {
  const userAgent = global.navigator && global.navigator.userAgent
  const isAndroid = () =>
    !isServer() && Boolean(userAgent && userAgent.match(/Android/i))
  const isIOS = () =>
    !isServer() && Boolean(userAgent && userAgent.match(/iPhone|iPad|iPod/i))
  const isOpera = () =>
    !isServer() && Boolean(userAgent && userAgent.match(/Opera Mini/i))
  const isWindowsPhone = () =>
    !isServer() && Boolean(userAgent && userAgent.match(/IEMobile/i))
  const isMobile = () =>
    !isServer() &&
    Boolean(isAndroid() || isIOS() || isOpera() || isWindowsPhone())
  const isDesktop = () => !isServer() && !isMobile()

  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIOS,
  }
}
