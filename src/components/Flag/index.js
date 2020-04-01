import React from 'react'
import PropTypes from 'prop-types'
import { Image } from '../Image'

export const Flag = ({ countryCode }) => {
  const country = countryCode.toUpperCase()

  return (
    <Image
      src={`https://unpkg.com/flagkit-web@0.0.3/svgs/${country}.svg`}
      alt={`Flag of ${country}`}
      aspectRatio={15 / 21}
      style={{
        width: 21,
        height: 15,
        minWidth: 21,
        minHeight: 15,
        borderRadius: 2,
      }}
    />
  )
}

Flag.propTypes = {
  countryCode: PropTypes.string.isRequired,
}
