import React from 'react'
import { render } from '../../../test/test.utils'
import { Card } from '.'

describe('Card', () => {
  it('renders without crashing', () => {
    const { container, getByText } = render(
      <Card
        title="League of Legends"
        subtitle="Riot Games"
        text="Available on"
        description="PC"
        footer="Free"
      />
    )

    expect(container.firstChild).toBeInTheDocument()
    expect(getByText(/League of Legends/i)).toBeInTheDocument()
    expect(getByText(/PC/i)).toBeInTheDocument()
    expect(getByText(/Available on/i)).toBeInTheDocument()
    expect(getByText(/Riot Games/i)).toBeInTheDocument()
    expect(getByText(/Free/i)).toBeInTheDocument()
  })

  it('can have adornments', () => {
    const { getByText } = render(
      <Card
        title="Eurovision Song Contest"
        leftAdornment={
          <span role="img" aria-label="Eurovision">
            🏅
          </span>
        }
        rightAdornment={
          <span role="img" aria-label="Eurovision">
            🎉
          </span>
        }
      />
    )

    expect(getByText(/🏅/i)).toBeInTheDocument()
    expect(getByText(/🎉/i)).toBeInTheDocument()
  })

  it('can not have a top left adornment when there is no image', () => {
    const { queryByText } = render(
      <Card
        title="Eurovision Song Contest"
        topLeftAdornment={
          <span role="img" aria-label="Eurovision">
            🏅
          </span>
        }
      />
    )

    expect(queryByText(/🏅/i)).not.toBeInTheDocument()
  })

  it('can have a top left adornment when there is no image', () => {
    const { getByText } = render(
      <Card
        title="Eurovision Song Contest"
        image="https://assets.imgix.net/unsplash/moon.jpg?fit=crop&crop=entropy&w=1678&h=1259&ixlib=imgixjs-3.4.1"
        topLeftAdornment={
          <span role="img" aria-label="Eurovision">
            🏅
          </span>
        }
      />
    )

    expect(getByText(/🏅/i)).toBeInTheDocument()
  })
})
