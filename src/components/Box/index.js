import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { space, device } from '../../theme'

export const Box = styled.div`
  position: relative;

  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}

  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}

  ${props =>
    props.textAlign &&
    css`
      text-align: ${props.textAlign};
    `}

  ${props =>
    props.gridGap &&
    css`
      grid-gap: ${space[props.gridGap]};
    `}

  ${props =>
    props.gridAutoFlow &&
    css`
      grid-auto-flow: ${props.gridAutoFlow};
    `}

  ${props =>
    props.gridTemplateColumns &&
    css`
      grid-template-columns: repeat(${props.gridTemplateColumns}, 1fr);
    `}

  ${props =>
    props.alignItems &&
    css`
      align-items: ${props.alignItems};
    `}

  ${props =>
    props.justifyContent &&
    css`
      justify-content: ${props.justifyContent};
    `}

  ${props =>
    props.flexDirection &&
    css`
      flex-direction: ${props.flexDirection};
    `}
  
  ${props =>
    props.flexWrap &&
    css`
      flex-wrap: ${props.flexWrap};
    `}
  
  ${props =>
    props.flexBasis &&
    css`
      flex-basis: ${props.flexBasis};
    `}
  
  ${props =>
    props.display &&
    css`
      display: ${props.display};
    `}

  ${props =>
    (props.marginTop || props.marginTop === 0) &&
    css`
      margin-top: ${space[props.marginTop]};
    `}

  ${props =>
    (props.marginLeft || props.marginLeft === 0) &&
    css`
      margin-left: ${space[props.marginLeft]};
    `}

  ${props =>
    (props.marginRight || props.marginRight === 0) &&
    css`
      margin-right: ${space[props.marginRight]};
    `}

  ${props =>
    (props.padding || props.padding === 0) &&
    css`
      padding: ${space[props.padding]};
    `}
  
  ${props =>
    props.maxWidth &&
    css`
      max-width: ${space[props.maxWidth]};
    `}
  
  ${props =>
    props.minWidth &&
    css`
      min-width: ${space[props.minWidth]};
    `}

  ${props =>
    (props.paddingLeft || props.paddingLeft === 0) &&
    css`
      padding-left: ${space[props.paddingLeft]};
    `}

  ${props =>
    (props.paddingRight || props.paddingRight === 0) &&
    css`
      padding-right: ${space[props.paddingRight]};
    `}

  ${props =>
    (props.paddingX || props.paddingX === 0) &&
    css`
      padding-left: ${space[props.paddingX]};
      padding-right: ${space[props.paddingX]};
    `}

  ${props =>
    (props.marginX || props.marginX === 0) &&
    css`
      margin-left: ${space[props.marginX]};
      margin-right: ${space[props.marginX]};
    `}

  ${props =>
    (props.margin || props.margin === 0) &&
    css`
      margin: ${space[props.margin]};
    `}

  ${props =>
    (props.paddingTop || props.paddingTop === 0) &&
    css`
      padding-top: ${space[props.paddingTop]};
    `}

  ${props =>
    (props.paddingBottom || props.paddingBottom === 0) &&
    css`
      padding-bottom: ${space[props.paddingBottom]};
    `}

  ${props =>
    (props.marginBottom || props.marginBottom === 0) &&
    css`
      margin-bottom: ${space[props.marginBottom]};
    `}

  ${props =>
    (props.paddingY || props.paddingY === 0) &&
    css`
      padding-top: ${space[props.paddingY]};
      padding-bottom: ${space[props.paddingY]};
    `}

  ${props =>
    (props.marginY || props.marginY === 0) &&
    css`
      margin-top: ${space[props.marginY]};
      margin-bottom: ${space[props.marginY]};
    `}

  @media ${device.mobileL} {
    ${props =>
      props.displaySm &&
      css`
        display: ${props.displaySm};
      `}

    ${props =>
      (props.paddingSm || props.paddingSm === 0) &&
      css`
        padding: ${space[props.paddingSm]};
      `}

    ${props =>
      props.textAlignSm &&
      css`
        text-align: ${props.textAlignSm};
      `}

    ${props =>
      (props.marginBottomSm || props.marginBottomSm === 0) &&
      css`
        margin-bottom: ${space[props.marginBottomSm]};
      `}
  }

  @media ${device.tablet} {
    ${props =>
      props.displayMd &&
      css`
        display: ${props.displayMd};
      `}

    ${props =>
      (props.paddingMd || props.paddingMd === 0) &&
      css`
        padding: ${space[props.paddingMd]};
      `}
    
    ${props =>
      props.textAlignMd &&
      css`
        text-align: ${props.textAlignMd};
      `}

    ${props =>
      props.widthMd &&
      css`
        width: ${props.widthMd};
      `}

    ${props =>
      props.justifyContentMd &&
      css`
        justify-content: ${props.justifyContentMd};
      `}

    ${props =>
      (props.paddingYMd || props.paddingYMd === 0) &&
      css`
        padding-top: ${space[props.paddingYMd]};
        padding-bottom: ${space[props.paddingYMd]};
      `}
    
    ${props =>
      (props.paddingTopMd || props.paddingTopMd === 0) &&
      css`
        padding-top: ${space[props.paddingTopMd]};
      `}
    
    ${props =>
      (props.paddingLeftMd || props.paddingLeftMd === 0) &&
      css`
        padding-left: ${space[props.paddingLeftMd]};
      `}
    
    ${props =>
      (props.paddingRightMd || props.paddingRightMd === 0) &&
      css`
        padding-right: ${space[props.paddingRightMd]};
      `}

    ${props =>
      (props.paddingBottomMd || props.paddingBottomMd === 0) &&
      css`
        padding-bottom: ${space[props.paddingBottomMd]};
      `}
    
    ${props =>
      props.flexDirectionMd &&
      css`
        flex-direction: ${props.flexDirectionMd};
      `}

    ${props =>
      props.flexWrapMd &&
      css`
        flex-wrap: ${props.flexWrapMd};
      `}
    
    ${props =>
      props.flexBasisMd &&
      css`
        flex-basis: ${props.flexBasisMd};
      `}

    ${props =>
      props.gridTemplateColumnsMd &&
      css`
        grid-template-columns: repeat(${props.gridTemplateColumnsMd}, 1fr);
      `}

    ${props =>
      props.gridGapMd &&
      css`
        grid-gap: ${space[props.gridGapMd]};
      `}
    
    ${props =>
      (props.marginTopMd || props.marginTopMd === 0) &&
      css`
        margin-top: ${space[props.marginTopMd]};
      `}

    ${props =>
      (props.marginBottomMd || props.marginBottomMd === 0) &&
      css`
        margin-bottom: ${space[props.marginBottomMd]};
      `}

    ${props =>
      (props.marginLeftMd || props.marginLeftMd === 0) &&
      css`
        margin-left: ${space[props.marginLeftMd]};
      `}

    ${props =>
      (props.marginRightMd || props.marginRightMd === 0) &&
      css`
        margin-right: ${space[props.marginRightMd]};
      `}

    ${props =>
      props.maxWidthMd &&
      css`
        max-width: ${space[props.maxWidthMd]};
      `}
    
    ${props =>
      props.minWidthMd &&
      css`
        min-width: ${space[props.minWidthMd]};
      `}
  }

  @media ${device.laptop} {
    ${props =>
      props.displayLg &&
      css`
        display: ${props.displayLg};
      `}

    ${props =>
      (props.paddingLg || props.paddingLg === 0) &&
      css`
        padding: ${space[props.paddingLg]};
      `}

    ${props =>
      props.textAlignLg &&
      css`
        text-align: ${props.textAlignLg};
      `}

    ${props =>
      (props.marginBottomLg || props.marginBottomLg === 0) &&
      css`
        margin-bottom: ${space[props.marginBottomLg]};
      `}
    
    ${props =>
      props.maxWidthLg &&
      css`
        max-width: ${space[props.maxWidthLg]};
      `}
  }
`

Box.propTypes = {
  alignItems: PropTypes.string,
  display: PropTypes.string,
  displaySm: PropTypes.string,
  displayMd: PropTypes.string,
  displayLg: PropTypes.string,
  flexDirection: PropTypes.string,
  flexWrap: PropTypes.string,
  flexWrapMd: PropTypes.string,
  flexBasis: PropTypes.string,
  flexBasisMd: PropTypes.string,
  gridAutoFlow: PropTypes.string,
  gridGap: PropTypes.number,
  gridGapMd: PropTypes.number,
  gridTemplateColumns: PropTypes.number,
  gridTemplateColumnsMd: PropTypes.number,
  justifyContent: PropTypes.string,
  justifyContentMd: PropTypes.string,
  textAlign: PropTypes.string,
  textAlignSm: PropTypes.string,
  textAlignMd: PropTypes.string,
  textAlignLg: PropTypes.string,
  margin: PropTypes.number,
  marginBottom: PropTypes.number,
  marginBottomSm: PropTypes.number,
  marginBottomMd: PropTypes.number,
  marginBottomLg: PropTypes.number,
  marginLeft: PropTypes.number,
  marginLeftMd: PropTypes.number,
  marginRight: PropTypes.number,
  marginRightMd: PropTypes.number,
  marginTop: PropTypes.number,
  marginTopMd: PropTypes.number,
  marginX: PropTypes.number,
  marginY: PropTypes.number,
  maxWidth: PropTypes.number,
  maxWidthMd: PropTypes.number,
  maxWidthLg: PropTypes.number,
  minWidth: PropTypes.number,
  minWidthMd: PropTypes.number,
  padding: PropTypes.number,
  paddingSm: PropTypes.number,
  paddingMd: PropTypes.number,
  paddingLg: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingBottomMd: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingTopMd: PropTypes.number,
  paddingX: PropTypes.number,
  paddingY: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string,
  widthMd: PropTypes.string,
}
