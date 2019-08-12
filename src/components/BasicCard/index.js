import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { H4, H5 } from '../Heading'
import { Image } from '../Image'
import { Card } from '../Card'
import { SkeletonLine } from '../Skeleton'
import { color, fontWeight, fontSize, device, transition } from '../../theme'

const StyledH4 = styled(H4)`
  color: ${props => (props.colored ? color.earth : color.space)};
  transition: color ${transition};

  a:hover &,
  a:focus & {
    color: ${props => (props.colored ? color.earthLight : color.spaceMedium)};
  }
`

const StyledH5 = styled(H5)`
  color: ${color.spaceLight};
`

const StyledStrong = styled.strong`
  font-weight: ${fontWeight.semiBold};
  font-size: ${fontSize[14]};
  display: block;

  @media ${device.tablet} {
    font-size: ${fontSize[16]};
  }
`

export const BasicCard = ({
  loading,
  adornment,
  imageUrl,
  imageWidth,
  imageHeight,
  title,
  subtitle,
  info,
  ...props
}) => (
  <Card
    {...props}
    adornment={adornment}
    image={
      imageUrl && (
        <Image
          src={imageUrl}
          width={imageWidth}
          height={imageHeight}
          alt={title}
          lazyLoad={loading ? false : true}
          rounded
        />
      )
    }
  >
    <StyledH4 colored={!imageUrl}>
      {loading ? <SkeletonLine width={1 / 1.12} /> : title}
    </StyledH4>
    {subtitle && (
      <StyledH5>
        {loading ? <SkeletonLine width={1 / 1.45} /> : subtitle}
      </StyledH5>
    )}
    {info && (
      <StyledStrong>
        {loading ? <SkeletonLine width={1 / 1.3} /> : info}
      </StyledStrong>
    )}
  </Card>
)

BasicCard.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  subtitle: PropTypes.string,
  info: PropTypes.string,
  imageUrl: PropTypes.string,
  imageAspectRatio: PropTypes.string,
}

BasicCard.defaultProps = {
  imageAspectRatio: '3x2',
}
