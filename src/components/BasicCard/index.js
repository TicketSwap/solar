import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { H4, H5 } from '../Heading'
import { Image } from '../Image'
import { Card } from '../Card'
import { color, fontWeight, fontSize, device, space } from '../../theme'

const StyledH4 = styled(H4)`
  color: ${props => (props.colored ? color.earth : color.space)};
`

const StyledH5 = styled(H5)`
  color: ${color.spaceLight};
`

const StyledStrong = styled.strong`
  font-weight: ${fontWeight.semiBold};
  font-size: ${fontSize[14]};
  display: inline-block;
  transform: translateY(-2px);

  @media ${device.tablet} {
    font-size: ${fontSize[16]};
  }
`

const Skeleton = styled.span`
  display: block;
  border-radius: ${space[4]};
  background-color: ${color.spaceLightest};
`

const TitleSkeleton = styled(Skeleton)`
  width: 75%;
  margin-bottom: ${space[8]};
  height: ${fontSize[20]};
`

const SubtitleSkeleton = styled(Skeleton)`
  width: 40%;
  margin-bottom: ${space[8]};
  height: ${fontSize[16]};
`

const AppendixSkeleton = styled(Skeleton)`
  width: 55%;
  height: ${fontSize[16]};
`

const Title = ({ loading, colored, children }) =>
  loading ? (
    <TitleSkeleton />
  ) : (
    <StyledH4 colored={colored}>{children}</StyledH4>
  )

const Subtitle = ({ loading, children }) =>
  loading ? <SubtitleSkeleton /> : <StyledH5>{children}</StyledH5>

const Appendix = ({ loading, children }) =>
  loading ? <AppendixSkeleton /> : <StyledStrong>{children}</StyledStrong>

export const BasicCard = ({
  loading,
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
    image={
      imageUrl && (
        <Image
          src={imageUrl}
          width={imageWidth}
          height={imageHeight}
          alt={title}
          loading={loading}
          rounded
        />
      )
    }
  >
    <Title loading={loading} colored={!imageUrl}>
      {title}
    </Title>
    {subtitle && <Subtitle loading={loading}>{subtitle}</Subtitle>}
    {info && <Appendix loading={loading}>{info}</Appendix>}
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
