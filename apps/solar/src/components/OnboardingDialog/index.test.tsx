import React from 'react'
import { StorybookDialog } from './index.stories'
import { fireEvent, render } from '../../../test/test.utils'
describe('OnboardingDialog', () => {
  it('renders without crashing', () => {
    const { container } = render(<StorybookDialog />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('can close & open the dialog', () => {
    const { getByText } = render(<StorybookDialog />)

    expect(getByText(/Onboarding page/i)).toBeInTheDocument()
    expect(getByText(/Onboarding you/i)).toBeInTheDocument()
    fireEvent.click(getByText(/Next/i))
    expect(getByText(/This explains everything/i)).toBeInTheDocument()
    fireEvent.click(getByText(/Close/i))
    fireEvent.click(getByText('Onboarding'))
    expect(getByText(/Onboarding you/i)).toBeInTheDocument()
  })
})
