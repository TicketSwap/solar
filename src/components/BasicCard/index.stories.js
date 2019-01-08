import React from 'react'
import { storiesOf } from '@storybook/react'
import { BasicCard } from './'
import { Box } from '../Box'

const cards = [
  {
    image:
      'https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80',
    title: 'Dockyard Festival #ade I am a very long title',
    info: 'Sat, 20th October • Havenpark',
    tickets: '34 tickets',
  },
  {
    image:
      'https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80',
    title: 'Dockyard Festival #ade',
    info: 'Sat, 20th October • Havenpark',
    tickets: '34 tickets',
  },
  {
    image:
      'https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80',
    title: 'Dockyard Festival #ade',
    info: 'Sat, 20th October • Havenpark',
    tickets: '34 tickets',
  },
]

storiesOf('BasicCard', module)
  .add('basic', () => (
    <Box display="grid" gridTemplateColumnsMd="3" gridGap={16} gridGapMd={32}>
      {cards.map(card => (
        <a href="/">
          <BasicCard
            title={card.title}
            subtitle={card.info}
            info={card.tickets}
          />
        </a>
      ))}
    </Box>
  ))
  .add('basic loading', () => (
    <Box display="grid" gridTemplateColumnsMd="3" gridGap={16} gridGapMd={32}>
      {cards.map(card => (
        <a href="/">
          <BasicCard
            title={card.title}
            subtitle={card.info}
            info={card.tickets}
            loading={true}
          />
        </a>
      ))}
    </Box>
  ))
  .add('with image', () => (
    <Box display="grid" gridTemplateColumnsMd="3" gridGap={16} gridGapMd={32}>
      {cards.map(card => (
        <a href="/">
          <BasicCard
            imageUrl={card.image}
            title={card.title}
            subtitle={card.info}
            info={card.tickets}
          />
        </a>
      ))}
    </Box>
  ))
  .add('with image loading', () => (
    <Box display="grid" gridTemplateColumnsMd="3" gridGap={16} gridGapMd={32}>
      {cards.map(card => (
        <a href="/">
          <BasicCard
            imageUrl={'Image'}
            title={card.title}
            subtitle={card.info}
            info={card.tickets}
            loading={true}
          />
        </a>
      ))}
    </Box>
  ))
