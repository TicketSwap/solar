import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { space, device } from '../../theme'

const generateResponsiveStyles = (property, values) => css`
  ${values.base &&
    css`
      ${property}: ${values.base};
    `}

  ${values.small &&
    css`
      @media ${device.mobileL} {
        ${property}: ${values.small};
      }
    `}

  ${values.medium &&
    css`
      @media ${device.tablet} {
        ${property}: ${values.medium};
      }
    `}

  ${values.large &&
    css`
      @media ${device.laptop} {
        ${property}: ${values.large};
      }
    `}
`

export const Box = styled.div`
  ${props =>
    generateResponsiveStyles('display', {
      base: props.display,
      small: props.displaySm,
      medium: props.displayMd,
      large: props.displayLg,
    })}

  ${props =>
    generateResponsiveStyles('align-items', {
      base: props.alignItems,
      small: props.alignItemsSm,
      medium: props.alignItemsMd,
      large: props.alignItemsLg,
    })}
  
  ${props =>
    generateResponsiveStyles('flex-basis', {
      base: props.flexBasis,
      small: props.flexBasisSm,
      medium: props.flexBasisMd,
      large: props.flexBasisLg,
    })}

  ${props =>
    generateResponsiveStyles('flex-direction', {
      base: props.flexDirection,
      small: props.flexDirectionSm,
      medium: props.flexDirectionMd,
      large: props.flexDirectionLg,
    })}
  
  ${props =>
    generateResponsiveStyles('flex-wrap', {
      base: props.flexWrap,
      small: props.flexWrapSm,
      medium: props.flexWrapMd,
      large: props.flexWrapLg,
    })}

  ${props =>
    generateResponsiveStyles('grid-auto-flow', {
      base: props.gridAutoFlow,
      small: props.gridAutoFlowSm,
      medium: props.gridAutoFlowMd,
      large: props.gridAutoFlowLg,
    })}

  ${props =>
    generateResponsiveStyles('grid-gap', {
      base: props.gridGap && space[props.gridGap],
      small: props.gridGapSm && space[props.gridGapSm],
      medium: props.gridGapMd && space[props.gridGapMd],
      large: props.gridGapLg && space[props.gridGapLg],
    })}
  
  ${props =>
    generateResponsiveStyles('grid-template-columns', {
      base:
        props.gridTemplateColumns &&
        `repeat(${props.gridTemplateColumns}, 1fr)`,
      small:
        props.gridTemplateColumnsSm &&
        `repeat(${props.gridTemplateColumnsSm}, 1fr)`,
      medium:
        props.gridTemplateColumnsMd &&
        `repeat(${props.gridTemplateColumnsMd}, 1fr)`,
      large:
        props.gridTemplateColumnsLg &&
        `repeat(${props.gridTemplateColumnsLg}, 1fr)`,
    })}
  
  ${props =>
    generateResponsiveStyles('justify-content', {
      base: props.justifyContent,
      small: props.justifyContentSm,
      medium: props.justifyContentMd,
      large: props.justifyContentLg,
    })}
  
  ${props =>
    generateResponsiveStyles('margin', {
      base: (props.margin || props.margin === 0) && space[props.margin],
      small: (props.marginSm || props.marginSm === 0) && space[props.marginSm],
      medium: (props.marginMd || props.marginMd === 0) && space[props.marginMd],
      large: (props.marginLg || props.marginLg === 0) && space[props.marginLg],
    })}

  ${props =>
    generateResponsiveStyles('margin-left', {
      base:
        (props.marginLeft || props.marginLeft === 0) && space[props.marginLeft],
      small:
        (props.marginLeftSm || props.marginLeftSm === 0) &&
        space[props.marginLeftSm],
      medium:
        (props.marginLeftMd || props.marginLeftMd === 0) &&
        space[props.marginLeftMd],
      large:
        (props.marginLeftLg || props.marginLeftLg === 0) &&
        space[props.marginLeftLg],
    })}

  ${props =>
    generateResponsiveStyles('margin-top', {
      base:
        (props.marginTop || props.marginTop === 0) && space[props.marginTop],
      small:
        (props.marginTopSm || props.marginTopSm === 0) &&
        space[props.marginTopSm],
      medium:
        (props.marginTopMd || props.marginTopMd === 0) &&
        space[props.marginTopMd],
      large:
        (props.marginTopLg || props.marginTopLg === 0) &&
        space[props.marginTopLg],
    })}

  ${props =>
    generateResponsiveStyles('margin-right', {
      base:
        (props.marginRight || props.marginRight === 0) &&
        space[props.marginRight],
      small:
        (props.marginRightSm || props.marginRightSm === 0) &&
        space[props.marginRightSm],
      medium:
        (props.marginRightMd || props.marginRightMd === 0) &&
        space[props.marginRightMd],
      large:
        (props.marginRightLg || props.marginRightLg === 0) &&
        space[props.marginRightLg],
    })}

  ${props =>
    generateResponsiveStyles('margin-bottom', {
      base:
        (props.marginBottom || props.marginBottom === 0) &&
        space[props.marginBottom],
      small:
        (props.marginBottomSm || props.marginBottomSm === 0) &&
        space[props.marginBottomSm],
      medium:
        (props.marginBottomMd || props.marginBottomMd === 0) &&
        space[props.marginBottomMd],
      large:
        (props.marginBottomLg || props.marginBottomLg === 0) &&
        space[props.marginBottomLg],
    })}

  
  ${props =>
    generateResponsiveStyles('padding', {
      base: (props.padding || props.padding === 0) && space[props.padding],
      small:
        (props.paddingSm || props.paddingSm === 0) && space[props.paddingSm],
      medium:
        (props.paddingMd || props.paddingMd === 0) && space[props.paddingMd],
      large:
        (props.paddingLg || props.paddingLg === 0) && space[props.paddingLg],
    })}

  ${props =>
    generateResponsiveStyles('padding-left', {
      base:
        (props.paddingLeft || props.paddingLeft === 0) &&
        space[props.paddingLeft],
      small:
        (props.paddingLeftSm || props.paddingLeftSm === 0) &&
        space[props.paddingLeftSm],
      medium:
        (props.paddingLeftMd || props.paddingLeftMd === 0) &&
        space[props.paddingLeftMd],
      large:
        (props.paddingLeftLg || props.paddingLeftLg === 0) &&
        space[props.paddingLeftLg],
    })}

  ${props =>
    generateResponsiveStyles('padding-top', {
      base:
        (props.paddingTop || props.paddingTop === 0) && space[props.paddingTop],
      small:
        (props.paddingTopSm || props.paddingTopSm === 0) &&
        space[props.paddingTopSm],
      medium:
        (props.paddingTopMd || props.paddingTopMd === 0) &&
        space[props.paddingTopMd],
      large:
        (props.paddingTopLg || props.paddingTopLg === 0) &&
        space[props.paddingTopLg],
    })}

  ${props =>
    generateResponsiveStyles('padding-right', {
      base:
        (props.paddingRight || props.paddingRight === 0) &&
        space[props.paddingRight],
      small:
        (props.paddingRightSm || props.paddingRightSm === 0) &&
        space[props.paddingRightSm],
      medium:
        (props.paddingRightMd || props.paddingRightMd === 0) &&
        space[props.paddingRightMd],
      large:
        (props.paddingRightLg || props.paddingRightLg === 0) &&
        space[props.paddingRightLg],
    })}

  ${props =>
    generateResponsiveStyles('padding-bottom', {
      base:
        (props.paddingBottom || props.paddingBottom === 0) &&
        space[props.paddingBottom],
      small:
        (props.paddingBottomSm || props.paddingBottomSm === 0) &&
        space[props.paddingBottomSm],
      medium:
        (props.paddingBottomMd || props.paddingBottomMd === 0) &&
        space[props.paddingBottomMd],
      large:
        (props.paddingBottomLg || props.paddingBottomLg === 0) &&
        space[props.paddingBottomLg],
    })}

  ${props =>
    generateResponsiveStyles('text-align', {
      base: props.textAlign,
      small: props.textAlignSm,
      medium: props.textAlignMd,
      large: props.textAlignLg,
    })}

  ${props =>
    generateResponsiveStyles('position', {
      base: props.position,
      small: props.positionSm,
      medium: props.positionMd,
      large: props.positionLg,
    })}
  
  ${props =>
    generateResponsiveStyles('z-index', {
      base: props.zIndex,
      small: props.zIndexSm,
      medium: props.zIndexMd,
      large: props.zIndexLg,
    })}

  ${props =>
    generateResponsiveStyles('height', {
      base: props.height,
      small: props.heightSm,
      medium: props.heightMd,
      large: props.heightLg,
    })}

  ${props =>
    generateResponsiveStyles('max-height', {
      base: props.maxHeight,
      small: props.maxHeightSm,
      medium: props.maxHeightMd,
      large: props.maxHeightLg,
    })}

  ${props =>
    generateResponsiveStyles('min-height', {
      base: props.minHeight,
      small: props.minHeightSm,
      medium: props.minHeightMd,
      large: props.minHeightLg,
    })}

  ${props =>
    generateResponsiveStyles('width', {
      base: props.width,
      small: props.widthSm,
      medium: props.widthMd,
      large: props.widthLg,
    })}

  ${props =>
    generateResponsiveStyles('max-width', {
      base: props.maxWidth,
      small: props.maxWidthSm,
      medium: props.maxWidthMd,
      large: props.maxWidthLg,
    })}

  ${props =>
    generateResponsiveStyles('min-width', {
      base: props.minWidth,
      small: props.minWidthSm,
      medium: props.minWidthMd,
      large: props.minWidthLg,
    })}
`

Box.defaultProps = {
  position: 'relative',
}

Box.propTypes = {
  /**
   * Display
   */

  display: PropTypes.string,
  displaySm: PropTypes.string,
  displayMd: PropTypes.string,
  displayLg: PropTypes.string,

  alignItems: PropTypes.string,
  alignItemsSm: PropTypes.string,
  alignItemsMd: PropTypes.string,
  alignItemsLg: PropTypes.string,

  flexBasis: PropTypes.string,
  flexBasisSm: PropTypes.string,
  flexBasisMd: PropTypes.string,
  flexBasisLg: PropTypes.string,

  flexDirection: PropTypes.string,
  flexDirectionSm: PropTypes.string,
  flexDirectionMd: PropTypes.string,
  flexDirectionLg: PropTypes.string,

  flexWrap: PropTypes.string,
  flexWrapSm: PropTypes.string,
  flexWrapMd: PropTypes.string,
  flexWrapLg: PropTypes.string,

  gridAutoFlow: PropTypes.string,
  gridAutoFlowSm: PropTypes.string,
  gridAutoFlowMd: PropTypes.string,
  gridAutoFlowLg: PropTypes.string,

  gridGap: PropTypes.number,
  gridGapSm: PropTypes.number,
  gridGapMd: PropTypes.number,
  gridGapLg: PropTypes.number,

  gridTemplateColumns: PropTypes.number,
  gridTemplateColumnsSm: PropTypes.number,
  gridTemplateColumnsMd: PropTypes.number,
  gridTemplateColumnsLg: PropTypes.number,

  justifyContent: PropTypes.string,
  justifyContentSm: PropTypes.string,
  justifyContentMd: PropTypes.string,
  justifyContentLg: PropTypes.string,

  /**
   * Margin
   */

  margin: PropTypes.number,
  marginSm: PropTypes.number,
  marginMd: PropTypes.number,
  marginLg: PropTypes.number,

  marginLeft: PropTypes.number,
  marginLeftSm: PropTypes.number,
  marginLeftMd: PropTypes.number,
  marginLeftLg: PropTypes.number,

  marginTop: PropTypes.number,
  marginTopSm: PropTypes.number,
  marginTopMd: PropTypes.number,
  marginTopLg: PropTypes.number,

  marginRight: PropTypes.number,
  marginRightSm: PropTypes.number,
  marginRightMd: PropTypes.number,
  marginRightLg: PropTypes.number,

  marginBottom: PropTypes.number,
  marginBottomSm: PropTypes.number,
  marginBottomMd: PropTypes.number,
  marginBottomLg: PropTypes.number,

  /**
   * Padding
   */

  padding: PropTypes.number,
  paddingSm: PropTypes.number,
  paddingMd: PropTypes.number,
  paddingLg: PropTypes.number,

  paddingLeft: PropTypes.number,
  paddingLeftSm: PropTypes.number,
  paddingLeftMd: PropTypes.number,
  paddingLeftLg: PropTypes.number,

  paddingTop: PropTypes.number,
  paddingTopSm: PropTypes.number,
  paddingTopMd: PropTypes.number,
  paddingTopLg: PropTypes.number,

  paddingRight: PropTypes.number,
  paddingRightSm: PropTypes.number,
  paddingRightMd: PropTypes.number,
  paddingRightLg: PropTypes.number,

  paddingBottom: PropTypes.number,
  paddingBottomSm: PropTypes.number,
  paddingBottomMd: PropTypes.number,
  paddingBottomLg: PropTypes.number,

  /**
   * Text
   */

  textAlign: PropTypes.string,
  textAlignSm: PropTypes.string,
  textAlignMd: PropTypes.string,
  textAlignLg: PropTypes.string,

  /**
   * Position
   */

  position: PropTypes.string,
  positionSm: PropTypes.string,
  positionMd: PropTypes.string,
  positionLg: PropTypes.string,

  zIndex: PropTypes.number,
  zIndexSm: PropTypes.number,
  zIndexMd: PropTypes.number,
  zIndexLg: PropTypes.number,

  /**
   * Dimensions
   */

  height: PropTypes.string,
  heightSm: PropTypes.string,
  heightMd: PropTypes.string,
  heightLg: PropTypes.string,

  maxHeight: PropTypes.number,
  maxHeightSm: PropTypes.number,
  maxHeightMd: PropTypes.number,
  maxHeightLg: PropTypes.number,

  minHeight: PropTypes.number,
  minHeightSm: PropTypes.number,
  minHeightMd: PropTypes.number,
  minHeightLg: PropTypes.number,

  width: PropTypes.string,
  widthSm: PropTypes.string,
  widthMd: PropTypes.string,
  widthLg: PropTypes.string,

  maxWidth: PropTypes.number,
  maxWidthSm: PropTypes.number,
  maxWidthMd: PropTypes.number,
  maxWidthLg: PropTypes.number,

  minWidth: PropTypes.number,
  minWidthSm: PropTypes.number,
  minWidthMd: PropTypes.number,
  minWidthLg: PropTypes.number,
}
