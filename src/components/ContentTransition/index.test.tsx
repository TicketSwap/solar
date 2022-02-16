import React, { ReactElement } from 'react'
import { useState } from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContentTransition } from './'

const delay = ms => new Promise(res => setTimeout(res, ms))

const TransitionExample = ({
  callback = () => null,
}: {
  callback?: (child: ReactElement) => void
}) => {
  const [activeView, setActiveView] = useState('first')

  return (
    <ContentTransition onChange={callback} activeView={activeView}>
      <h1>Title</h1>
      <div key="first" title="First">
        <p>First view</p>
        <button onClick={() => setActiveView('second')}>Go to second</button>
      </div>
      <div key="second" title="Second">
        <p>Second view</p>
        <button onClick={() => setActiveView('first')}>Go to first</button>
      </div>
    </ContentTransition>
  )
}

describe('ContentTransition', () => {
  it('renders the initial view', async () => {
    render(<TransitionExample />)

    expect(screen.getByText('First view')).toBeInTheDocument()
  })

  describe('when the view changes', () => {
    it('renders the new view', async () => {
      render(<TransitionExample />)

      userEvent.click(screen.getByRole('button', { name: /go to second/i }))

      const secondView = await screen.findByText('Second view')

      expect(secondView).toBeInTheDocument()
    })

    describe('and the view changes again', () => {
      it('renders the initial view', async () => {
        render(<TransitionExample />)

        userEvent.click(screen.getByRole('button', { name: /go to second/i }))

        await screen.findByText('Second view')

        userEvent.click(screen.getByRole('button', { name: /go to first/i }))

        const firstView = await screen.findByText('First view')

        expect(firstView).toBeInTheDocument()
      })
    })

    describe('and there is a onChange callback', () => {
      it('invokes the callback', async () => {
        const callback = jest.fn()

        render(<TransitionExample callback={view => callback(view)} />)

        userEvent.click(screen.getByRole('button', { name: /go to second/i }))

        await screen.findByText('Second view')

        expect(callback).toHaveBeenCalledWith(
          expect.objectContaining({ key: 'second' })
        )
      })

      /* TODO: The actual behavior should be to cancel async tasks */
      describe('and the component has unmounted', () => {
        it('does not cancel async tasks', async () => {
          const callback = jest.fn()

          const { unmount } = render(
            <TransitionExample
              callback={async children => {
                await delay(10)
                callback(children)
              }}
            />
          )

          userEvent.click(screen.getByRole('button', { name: /go to second/i }))

          unmount()

          await delay(10)

          expect(callback).toHaveBeenCalledTimes(2)
        })
      })
    })
  })
})
