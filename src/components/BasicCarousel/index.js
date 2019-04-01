import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Spring, animated } from 'react-spring'
import { Gesture } from '../Gesture'
import { space, device, color, transition } from '../../theme'
import { Carousel } from '../Carousel'
import { Icon } from '../Icon'

/**
 * Currently this works with a gutter of `1rem`.
 *
 * On mobile, a gutter is applied to the left and right
 * of the carousel and the container spans the entire
 * viewport.
 *
 * For larger screens, the outer gutters are disabled
 * so the carousel can be used in a max-width container.
 */

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  /* Span entire viewport width on mobile */
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;

  @media ${device.tablet} {
    width: auto;
    left: auto;
    right: auto;
    margin-left: 0;
    margin-right: 0;
  }
`

const PrevNextButton = styled.button`
  position: absolute;
  z-index: 2;
  display: none;
  color: ${color.spaceMedium};
  transition: color ${transition};
  user-select: none;
  outline: 0;

  &:hover,
  &:focus {
    color: ${color.space};
    box-shadow: none;
  }

  @media ${device.tablet} {
    display: block;
  }
`

const PrevButton = styled(PrevNextButton)`
  left: -${space[32]};
`

const NextButton = styled(PrevNextButton)`
  right: -${space[32]};
`

const OuterContainer = styled.div`
  width: 100%;
  position: relative;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-padding: ${space[16]};
  padding-left: ${space[16]};

  &::before,
  &::after {
    /* Blinds */
    /* Ugly hack to cover the left and right edges */
    display: none;
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    width: ${space[8]};
    background-color: white;
    pointer-events: none;
  }

  &::before {
    /* Left blind */
    left: 0;

    @media ${device.tablet} {
      display: ${props => (props.leftBlind ? 'block' : 'none')};
    }
  }

  &::after {
    /* Right blind */
    right: 0;

    @media ${device.tablet} {
      display: ${props => (props.rightBlind ? 'block' : 'none')};
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }

  ${props =>
    props.isdraggable === 'true' &&
    css`
      cursor: move; /* fallback if grab cursor is unsupported */
      cursor: grab;

      &:active {
        cursor: grabbing;
      }
    `};

  @media ${device.tablet} {
    padding-left: 0;
    overflow: hidden;
    margin-left: -${space[8]};
    margin-right: -${space[8]};
    width: calc(100% + ${space[16]});
  }
`

const InnerContainer = styled(animated.div)`
  pointer-events: ${props => (props.isdraggable === 'true' ? 'none' : 'auto')};
  position: relative;
  display: flex;
`

const ItemContainer = styled.div`
  scroll-snap-align: start;
  display: inline-block;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding-right: ${space[16]};
  vertical-align: middle;

  ${props =>
    props.itemWidth &&
    css`
      width: ${props => props.itemWidth * 100}%;
      width: ${props =>
        `calc(${props.itemWidth * 100}% - ${space[16 * props.itemWidth]})`};
    `};

  @media ${device.mobileL} {
    ${props =>
      props.itemWidthSm &&
      css`
        width: ${props => props.itemWidth * 100}%;
        width: ${props =>
          `calc(${props.itemWidthSm * 100}% - ${
            space[16 * props.itemWidthSm]
          })`};
      `};
  }

  @media ${device.tablet} {
    padding-left: ${space[8]};
    padding-right: ${space[8]};

    ${props =>
      props.itemWidthMd &&
      css`
        width: ${props => props.itemWidthMd * 100}%;
      `};
  }
`

export const BasicCarousel = ({
  items,
  itemWidth,
  itemWidthSm,
  itemWidthMd,
  ...props
}) => (
  <Carousel {...props}>
    {({
      getPrevButtonProps,
      getNextButtonProps,
      getOuterContainerProps,
      getInnerContainerProps,
      hasPrev,
      hasNext,
      position,
      onDrag,
    }) => {
      return (
        <Wrapper>
          {props.prevNextButtons && hasPrev ? (
            <PrevButton {...getPrevButtonProps()}>
              <Icon glyph="arrow-left" />
            </PrevButton>
          ) : null}
          {props.prevNextButtons && hasNext ? (
            <NextButton {...getNextButtonProps()}>
              <Icon glyph="arrow-right" />
            </NextButton>
          ) : null}
          <Gesture
            onAction={({ down, xDelta }) =>
              props.draggable && !down && xDelta !== 0 ? onDrag(xDelta) : null
            }
            touch={false}
          >
            {({ down, xDelta }) => (
              <OuterContainer
                {...getOuterContainerProps({
                  // Disable left blind for variable width carousels
                  leftBlind:
                    !itemWidth && !hasPrev && props.blinds
                      ? false
                      : props.blinds,
                  rightBlind: props.blinds,
                  // Called `isdraggable` because `draggable`
                  // would trigger native browser behaviour.
                  isdraggable: props.draggable ? 'true' : 'false',
                })}
              >
                <Spring
                  native
                  to={{
                    x: props.draggable
                      ? down
                        ? position + xDelta
                        : position
                      : position * -1 || 0,
                  }}
                >
                  {({ x }) => (
                    <InnerContainer
                      {...getInnerContainerProps({
                        isdraggable: props.draggable ? 'true' : 'false',
                        style: {
                          transform: x.interpolate(
                            x => `translate3d(${x}px, 0, 0)`
                          ),
                        },
                      })}
                    >
                      {items.map((item, i) => (
                        <ItemContainer
                          key={i}
                          itemWidth={itemWidth}
                          itemWidthSm={itemWidthSm}
                          itemWidthMd={itemWidthMd}
                        >
                          {item}
                        </ItemContainer>
                      ))}
                    </InnerContainer>
                  )}
                </Spring>
              </OuterContainer>
            )}
          </Gesture>
        </Wrapper>
      )
    }}
  </Carousel>
)

BasicCarousel.propTypes = {
  items: PropTypes.array,
  itemWidth: PropTypes.number,
  itemWidthSm: PropTypes.number,
  itemWidthMd: PropTypes.number,
  draggable: PropTypes.bool,
  prevNextButtons: PropTypes.bool,
  blinds: PropTypes.bool,
}

BasicCarousel.defaultProps = {
  draggable: false,
  prevNextButtons: true,
  blinds: true,
}
