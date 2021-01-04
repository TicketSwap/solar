import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { matchers } from '@emotion/jest'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '.'

expect.extend(matchers)

describe('Alert', () => {
  it('renders without crashing and calls action handlers', () => {
    const { container, getByText } = render(
      <Accordion>
        <AccordionItem>
          <AccordionButton>What is solar?</AccordionButton>
          <AccordionPanel>
            <p>Solar is a React component library.</p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>What is comets?</AccordionButton>
          <AccordionPanel>
            <p>Comets is an icon set written in JSX.</p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    )

    expect(container.firstChild).toBeInTheDocument()
    const solar = getByText(/Solar is a React component library./i)
    expect(solar).toBeInTheDocument()
    const comets = getByText(/Comets is an icon set written in JSX./i)
    expect(comets).toBeInTheDocument()
    const solarButton = getByText(/What is solar?/i)
    fireEvent.click(solarButton)
    const cometsButton = getByText(/What is comets?/i)
    fireEvent.click(cometsButton)
  })
})
