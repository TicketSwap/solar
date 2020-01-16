import React from 'react'
import { number, func, string, bool } from 'prop-types'
import styled from '@emotion/styled'
import { Star } from '@ticketswap/comets'
import { color, space } from '../../theme'
import { visuallyHidden } from '../VisuallyHidden'

const Label = styled.label`
  display: inline-block;
  color: ${props => (props.isActive ? color.sun : color.spaceLightest)};
  cursor: pointer;
`

const Input = styled.input`
  ${visuallyHidden};
`

const LabelText = styled.span`
  color: ${color.spaceMedium};
`

const VisuallyHiddenLabelText = styled.span`
  ${visuallyHidden};
`

const Stars = styled.div`
  transform: translateX(-${space[4]});
  margin-bottom: -${space[4]};
`

export function StarRating({
  label,
  hideLabel,
  initialRating,
  starCount,
  onChange,
  ...props
}) {
  const [rating, setRating] = React.useState(initialRating)
  const [tempRating, setTempRating] = React.useState(initialRating)
  const stars = Array.from(new Array(starCount + 1)).map((_, i) => i)

  function rate(value) {
    setTempRating(value)
    setRating(value)
    onChange(value)
  }

  function handleMouseOver(value) {
    setTempRating(rating)
    setRating(value)
  }

  function handleMouseOut() {
    setRating(tempRating)
  }

  return (
    <div {...props}>
      {hideLabel ? (
        <VisuallyHiddenLabelText>{label}</VisuallyHiddenLabelText>
      ) : (
        <LabelText>{label}</LabelText>
      )}
      <Stars>
        {stars.map(i => (
          <Label
            key={i}
            isActive={rating >= i && rating !== null}
            onMouseDown={() => rate(i)}
            onKeyDown={e => e.keyCode === 13 && rate(i)}
            onMouseOver={() => handleMouseOver(i)}
            onMouseOut={() => handleMouseOut(i)}
            onFocus={() => handleMouseOver(i)}
            onBlur={() => handleMouseOut(i)}
          >
            <Input
              value={i}
              checked={rating === i}
              type="radio"
              name="rating"
              onChange={() => rate(i)}
            />
            <VisuallyHiddenLabelText>{i} stars</VisuallyHiddenLabelText>
            {i !== 0 && <Star />}
          </Label>
        ))}
      </Stars>
    </div>
  )
}

StarRating.defaultProps = {
  starCount: 5,
  initialRating: 0,
  onChange: () => {},
}

StarRating.propTypes = {
  label: string.isRequired,
  hideLabel: bool,
  starCount: number.isRequired,
  initialRating: number.isRequired,
  onChange: func.isRequired,
}
