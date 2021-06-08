import React from 'react'
import { render } from '@testing-library/react'
import { SpeechBubble } from './'

describe('SpeechBubble', () => {
  it('renders without crashing', () => {
    const { container, getByText } = render(
      <SpeechBubble>
        <p>Great, thanks for your feedback!</p>
      </SpeechBubble>
    )

    expect(container.firstChild).toBeInTheDocument()
    expect(getByText(/Great, thanks for your feedback!/i)).toBeInTheDocument()
  })
})
