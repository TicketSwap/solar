import React from 'react'
import styled from '@emotion/styled'
import { Star } from '../../icons'
import { color, space } from '../../theme'
import { visuallyHidden } from '../VisuallyHidden'

export interface StarRatingProps {
  label: string
  hideLabel?: boolean
  starCount?: number
  initialRating?: number
  onChange?: (e: number) => void
}

interface StyledLabelProps {
  isActive: boolean
}

const Label = styled.label<StyledLabelProps>`
  display: inline-block;
  color: ${props => (props.isActive ? color.sun : color.inactiveBackground)};
  cursor: pointer;
`

const Input = styled.input`
  ${visuallyHidden};
`

const LabelText = styled.span`
  color: ${color.foreground};
`

const VisuallyHiddenLabelText = styled.span`
  ${visuallyHidden};
`

const Stars = styled.div`
  transform: translateX(-${space[4]});
  margin-bottom: -${space[4]};
`

export const StarRating: React.FC<StarRatingProps> = ({
  label,
  hideLabel,
  initialRating = 0,
  starCount = 5,
  onChange = () => null,
  ...props
}) => {
  const [rating, setRating] = React.useState(initialRating)
  const [tempRating, setTempRating] = React.useState(initialRating)
  const stars = Array.from(new Array(starCount + 1)).map((_, i) => i)

  function rate(value: number) {
    setTempRating(value)
    setRating(value)
    onChange(value)
  }

  function handleMouseOver(value: number) {
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
            onMouseOut={() => handleMouseOut()}
            onFocus={() => handleMouseOver(i)}
            onBlur={() => handleMouseOut()}
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
