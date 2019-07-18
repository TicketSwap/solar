import React from 'react'
import { number, func } from 'prop-types'
import styled from '@emotion/styled'
import { Star } from '@ticketswap/comets'
import { color } from '../../theme'
import { visuallyHidden } from '../VisuallyHidden'

const Label = styled.label`
  display: inline-block;
  color: ${props => (props.isActive ? color.earth : color.spaceLightest)};
  cursor: pointer;
`

const Input = styled.input`
  ${visuallyHidden};
`

const Text = styled.span`
  ${visuallyHidden};
`

const VisuallyHiddenStar = styled(Star)`
  ${visuallyHidden};
`

const Button = styled.button`
  ${visuallyHidden};
`

export function StarRating({ initialRating, starCount, onChange, ...props }) {
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

  function handleSubmit(e) {
    e.preventDefault()
    onChange(rating)
  }

  return (
    <form onSubmit={handleSubmit} {...props}>
      {stars.map(i => (
        <Label
          key={i}
          isActive={rating >= i && rating !== null}
          onMouseDown={() => rate(i)}
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
          <Text>{i} stars</Text>
          {i === 0 ? <VisuallyHiddenStar /> : <Star />}
        </Label>
      ))}
      <Button type="submit">Submit rating</Button>
    </form>
  )
}

StarRating.defaultProps = {
  starCount: 5,
  initialRating: 0,
  onChange: () => {},
}

StarRating.propTypes = {
  starCount: number.isRequired,
  initialRating: number.isRequired,
  onChange: func.isRequired,
}
