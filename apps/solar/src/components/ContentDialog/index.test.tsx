import React from 'react'
import { fireEvent, screen, render } from '../../../test/test.utils'
import { ContentDialog } from '.'
import { H1 } from '../Heading'

const MyDialog = () => {
  const [showDialog, setShowDialog] = React.useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      <button onClick={open}>Open Dialog</button>
      <ContentDialog
        isOpen={showDialog}
        onDismiss={close}
        imageUrl="https://images.unsplash.com/photo-1532452119098-a3650b3c46d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80"
        title="Cracking TicketSwap"
        subtitle="Insider tips for safely buying and selling tickets"
      >
        <H1>Heading 1</H1>
        <p>
          It’s no surprise the day I landed a job at TicketSwap an avalanche of
          questions began about how to best get tickets? Things like; Do you get
          free tickets for life now? Can you get me free tickets for life now?
        </p>
      </ContentDialog>
    </>
  )
}

describe('ContentDialog', () => {
  it('renders the button', () => {
    render(<MyDialog />)
    expect(screen.getByText('Open Dialog')).toBeInTheDocument()
  })

  it('renders the dialog', () => {
    render(<MyDialog />)

    fireEvent.click(screen.getByText('Open Dialog'))
    expect(screen.getAllByText('Cracking TicketSwap')[0]).toBeInTheDocument()
    expect(screen.getByText('Heading 1')).toBeInTheDocument()
  })

  it('closes the dialog', () => {
    render(<MyDialog />)

    fireEvent.click(screen.getByText('Open Dialog'))
    const bodyText = screen.getByText('Heading 1')
    expect(bodyText).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(bodyText).not.toBeInTheDocument()
  })
})
