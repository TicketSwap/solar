import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, fontSize, space, fontWeight } from '../../theme'

export const Pill = styled.span`
  padding: 5px ${space[8]} 3px;
  border-radius: ${space[32]};
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  font-size: ${fontSize[14]};
  font-weight: ${fontWeight.bold};
  display: inline-flex;
  align-items: center;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${p => (p.variant === 'secondary' ? color.earth : 'white')};
  background-color: ${p =>
    p.variant === 'danger'
      ? color.mars
      : p.variant === 'secondary'
      ? '#F0FBFE'
      : p.variant === 'success'
      ? color.titan
      : p.variant === 'warning'
      ? color.sun
      : color.earth};
`

Pill.defaultProps = {
  variant: 'primary',
}

Pill.propTypes = {
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
  ]),
}
