import React from 'react'
import Img from 'gatsby-image'
import { radius } from '../../theme'

export function Image({
  alt,
  src,
  srcSet,
  sizes,
  aspectRatio,
  rounded,
  style,
}) {
  return (
    <Img
      fluid={{
        src,
        aspectRatio,
        sizes,
        srcSet,
      }}
      style={{ borderRadius: rounded ? radius.lg : 0, ...style }}
      alt={alt}
    />
  )
}

Image.defaultProps = {
  aspectRatio: 300 / 200,
  sizes: '100vw',
  srcSet: '',
}
