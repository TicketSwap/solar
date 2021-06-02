import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '.'

describe('Accordion', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem>
          <AccordionButton>Glenn Gijsberts</AccordionButton>
          <AccordionPanel>
            <p>Glenn is Front-end developer</p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Samy Basset</AccordionButton>
          <AccordionPanel>
            <p>Samy is Back-end developer</p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    )

    expect(getByText(/Glenn Gijsberts/i)).toBeInTheDocument()
  })

  it('will only display one panel at a time', () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem>
          <AccordionButton>Glenn Gijsberts</AccordionButton>
          <AccordionPanel>
            <p>Glenn is Front-end developer</p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Samy Basset</AccordionButton>
          <AccordionPanel>
            <p>Samy is Back-end developer</p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    )

    expect(
      getByText(/Glenn Gijsberts/i)
        .closest('div')
        ?.getAttribute('data-state')
    ).toEqual('open')

    expect(
      getByText(/Samy Basset/i)
        .closest('div')
        ?.getAttribute('data-state')
    ).toEqual('collapsed')

    fireEvent.click(getByText(/Samy Basset/i))

    expect(
      getByText(/Samy Basset/i)
        .closest('div')
        ?.getAttribute('data-state')
    ).toEqual('open')

    expect(
      getByText(/Glenn Gijsberts/i)
        .closest('div')
        ?.getAttribute('data-state')
    ).toEqual('collapsed')
  })

  it('is possible to close all items with the collapsible prop ', () => {
    const { getByText } = render(
      <Accordion collapsible>
        <AccordionItem>
          <AccordionButton>Glenn Gijsberts</AccordionButton>
          <AccordionPanel>
            <p>Glenn is Front-end developer</p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Samy Basset</AccordionButton>
          <AccordionPanel>
            <p>Samy is Back-end developer</p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    )

    expect(
      getByText(/Glenn Gijsberts/i)
        .closest('div')
        ?.getAttribute('data-state')
    ).toEqual('collapsed')

    expect(
      getByText(/Samy Basset/i)
        .closest('div')
        ?.getAttribute('data-state')
    ).toEqual('collapsed')

    fireEvent.click(getByText(/Samy Basset/i))

    expect(
      getByText(/Samy Basset/i)
        .closest('div')
        ?.getAttribute('data-state')
    ).toEqual('open')

    fireEvent.click(getByText(/Samy Basset/i))

    expect(
      getByText(/Samy Basset/i)
        .closest('div')
        ?.getAttribute('data-state')
    ).toEqual('collapsed')
  })
})
