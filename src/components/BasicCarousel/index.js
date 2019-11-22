import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Spring, animated } from 'react-spring'
import { space, device, color, transition } from '../../theme'
import { Carousel } from '../Carousel'
import { ChevronLeftAlt, ChevronRightAlt } from '@ticketswap/comets'

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

  @media ${device.tablet} {
    padding-left: 0;
    overflow: hidden;
    margin-left: -${space[8]};
    margin-right: -${space[8]};
    width: calc(100% + ${space[16]});
  }
`

const InnerContainer = styled(animated.div)`
  position: relative;
  display: flex;
`

const width = props =>
  props.itemWidth &&
  css`
    width: ${props.itemWidth * 100}%;
    width: ${`calc(${props.itemWidth * 100}% - ${
      space[16 * props.itemWidth]
    })`};
  `

const widthSm = props =>
  props.itemWidthSm &&
  css`
    width: ${props.itemWidthSm * 100}%;
    width: ${`calc(${props.itemWidthSm * 100}% - ${
      space[16 * props.itemWidthSm]
    })`};
  `

const widthMd = props =>
  props.itemWidthMd &&
  css`
    width: ${props.itemWidthMd * 100}%;
  `

const ItemContainer = styled.div`
  scroll-snap-align: start;
  display: inline-block;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding-right: ${space[16]};
  vertical-align: middle;

  ${width};

  @media ${device.mobileL} {
    ${widthSm};
  }

  @media ${device.tablet} {
    ${widthMd};
    padding-left: ${space[8]};
    padding-right: ${space[8]};
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
    }) => {
      return (
        <Wrapper>
          {props.prevNextButtons && hasPrev ? (
            <PrevButton {...getPrevButtonProps()}>
              <ChevronLeftAlt />
            </PrevButton>
          ) : null}
          {props.prevNextButtons && hasNext ? (
            <NextButton {...getNextButtonProps()}>
              <ChevronRightAlt />
            </NextButton>
          ) : null}
          <OuterContainer
            {...getOuterContainerProps({
              // Disable left blind for variable width carousels
              leftBlind:
                !itemWidth && !hasPrev && props.blinds ? false : props.blinds,
              rightBlind: props.blinds,
            })}
          >
            <Spring
              native
              to={{
                x: position * -1 || 0,
              }}
            >
              {({ x }) => (
                <InnerContainer
                  {...getInnerContainerProps({
                    style: {
                      transform: x.interpolate(
                        x => `translate3d(${x}px, 0, 0)`
                      ),
                    },
                  })}
                >
                  {items &&
                    items.map((item, i) => (
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
  prevNextButtons: PropTypes.bool,
  blinds: PropTypes.bool,
}

BasicCarousel.defaultProps = {
  prevNextButtons: true,
  blinds: true,
}
