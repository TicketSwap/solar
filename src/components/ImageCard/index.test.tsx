import React from 'react'
import { render } from '../../../test/test.utils'
import { ImageCard } from '.'

describe('ImageCard', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <ImageCard
        imageAlt="intoTheDunesImage"
        imageUrl="https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/201610/80afc84b-2091-4359-9fd7-9126d684182c.jpeg"
        title="Into the dunes Festival"
        text="Whisper of the sand in the dunes, sun on your face, feet burning... find the oasis"
      />
    )
    expect(getByText(/Into the dunes Festival/i)).toBeInTheDocument()
  })
})
