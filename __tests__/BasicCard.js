import React from 'react'
import { render } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { BasicCard } from '../src/components/BasicCard'

describe('BasicCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BasicCard title="Card title" subtitle="Card subtitle" info="Card info" />
    )
    const el = container.firstChild
    expect(el).toBeInTheDocument()
  })

  it('renders title, subtitle, info and image', () => {
    const { getByAltText, getByText } = render(
      <BasicCard
        imageUrl="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80"
        title="Card title"
        subtitle="Card subtitle"
        info="Card info"
      />
    )
    const image = getByAltText(/card title/i)
    const title = getByText(/card title/i)
    const subtitle = getByText(/card subtitle/i)
    const info = getByText(/card info/i)
    expect(image).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
    expect(info).toBeInTheDocument()
  })
})
