import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import styled from '@emotion/styled'
import { Cover } from '../Cover'
import {
  color,
  device,
  easing,
  fontWeight,
  radius,
  shadow,
  space,
  transition,
} from '../../theme'
import { Text } from '../Text'
import { H2, H4 } from '../Heading'
import { Close } from '@ticketswap/comets'
import { css, Global } from '@emotion/core'
import { useTransition } from '../../hooks'

const duration = 200

const StyledDialogOverlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2147483646; /* largest accepted z-index value as integer minus 1 */
  opacity: ${props =>
    props.state === 'entering' || props.state === 'entered' ? 1 : 0};
  transition: opacity ${duration}ms ${easing.easeOutCubic};
`

const StyledDialogContent = styled(DialogContent)`
  padding: 0;
  width: 100%;
  max-width: 44rem;
  margin: 0;
  min-height: 100vh;
  background: white;
  outline: none;
  transform: ${props =>
    props.state === 'entering' || props.state === 'entered'
      ? 'translate3d(0,0,0)'
      : 'translate3d(0,1rem,0)'};
  transition: transform ${duration}ms ${easing.easeOutCubic};

  @media ${device.tablet} {
    margin: 10vh auto;
    border-radius: ${radius.lg};
    overflow-x: hidden;
    min-height: auto;
    transform: ${props => {
      switch (props.state) {
        case 'exited':
          return 'translate3d(0,-1rem,0)'
        case 'exiting':
          return 'translate3d(0,1rem,0)'
        default:
          return 'translate3d(0,0,0)'
      }
    }};
  }
`

const TitleHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${space[56]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${color.stardustLight};
  padding: ${space[8]} ${space[16]};
  z-index: 10;
  transform: ${props => (props.show ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform ${transition};
  box-shadow: ${shadow.strong};

  @media ${device.tablet} {
    display: none;
  }

  h4 {
    font-weight: ${fontWeight.bold};
    font-weight: 700;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  button {
    height: ${space[44]};
    width: ${space[44]};
    border-radius: 50%;
    background-color: ${color.skyLight};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${color.earth};
  }
`

const ContentWrapper = styled.div`
  padding: ${space[16]};

  @media ${device.tablet} {
    padding: ${space[24]};
  }
`

export const ContentDialog = ({
  children,
  imageUrl,
  blurred,
  title,
  subtitle,
  onDismiss,
  ...props
}) => {
  const [showTitleHeader, setShowTitleHeader] = useState(false)
  const headerRef = React.useRef()

  const [state] = useTransition({
    in: props.isOpen,
    timeout: duration,
    onExited: onDismiss,
  })

  const handleScroll = () => {
    const boundingRect = headerRef.current.getBoundingClientRect()
    setShowTitleHeader(boundingRect.bottom < 56)
  }

  const handleDismiss = () => {
    setShowTitleHeader(false)
    onDismiss()
  }

  return (
    <>
      <StyledDialogOverlay
        {...props}
        onDismiss={handleDismiss}
        onScroll={handleScroll}
        state={state}
      >
        <StyledDialogContent aria-label={title} state={state}>
          <ContentDialogHeader
            ref={headerRef}
            imageUrl={imageUrl}
            blurred={blurred}
            title={title}
            subtitle={subtitle}
            onDismiss={handleDismiss}
          />
          <ContentWrapper>{children}</ContentWrapper>
        </StyledDialogContent>
        <TitleHeader show={showTitleHeader}>
          <H4>{title}</H4>
          <button onClick={onDismiss}>
            <Close size={16} />
          </button>
        </TitleHeader>
      </StyledDialogOverlay>
      <Global
        styles={css`
          :root {
            --reach-dialog: 1;
          }
        `}
      />
    </>
  )
}

ContentDialog.propTypes = {
  allowPinchZoom: PropTypes.bool,
  isOpen: PropTypes.bool,
  onDismiss: PropTypes.func,
  imageUrl: PropTypes.string.isRequired,
  blurred: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

const StyledCover = styled(Cover)`
  padding: 0 ${space[16]};

  @media ${device.tablet} {
    padding: 0 ${space[24]};
  }

  > div {
    padding-bottom: ${space[16]};
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: ${space[16]};
  right: ${space[16]};
  height: ${space[44]};
  width: ${space[44]};
  border-radius: 50%;
  background-color: ${color.spaceDark};
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.tablet} {
    top: ${space[24]};
    right: ${space[24]};
    height: ${space[56]};
    width: ${space[56]};
  }
`

const StyledClose = styled(Close)`
  @media ${device.tablet} {
    transform: scale(1.5);
  }
`

const Subtitle = styled(Text)`
  color: ${color.stardustLightAlpha};
`

const ContentDialogHeader = React.forwardRef(
  ({ imageUrl, blurred, title, subtitle, onDismiss }, ref) => {
    return (
      <div ref={ref}>
        <StyledCover imageUrl={imageUrl} blurred={blurred}>
          <H2>{title}</H2>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          <CloseButton onClick={onDismiss}>
            <StyledClose size={16} />
          </CloseButton>
        </StyledCover>
      </div>
    )
  }
)
