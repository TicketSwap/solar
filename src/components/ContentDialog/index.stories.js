import React from 'react'
import { ContentDialog } from './'
import { H1, H2 } from '../Heading'

export default {
  title: 'ContentDialog',
}

export const Default = () => {
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

export const WithLongBody = () => {
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
          and What’s the secret to always getting a ticket? Initially, my answer
          was simple, ‘I’ve only been working there a few days, how am I
          supposed to know’? Now a few months in, I’m fresh out of excuses and
          it’s about time I shared a few trade secrets on how to make the most
          out of TicketSwap.
        </p>
        <H2>Heading 2</H2>
        <p>
          First things first, email notifications are too slow a process. You
          have to enable push notifications through the app if you want any hope
          in snaring a ticket to an event in high demand. If you want to ensure
          you’re moving at light speed, also take the passcode lock off your
          phone, seconds, even milliseconds mean everything in the race for
          precious tickets.
        </p>
        <H2>Heading 3</H2>
      </ContentDialog>
    </>
  )
}
