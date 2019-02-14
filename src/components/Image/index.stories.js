import React from 'react'
import { storiesOf } from '@storybook/react'
import { Image } from './'

storiesOf('Image', module)
  .add('basic', () => (
    <Image src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=1200&q=80" />
  ))
  .add('4x3', () => (
    <Image
      src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=300"
      width={400}
      height={300}
    />
  ))
  .add('square', () => (
    <Image
      src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=1200&q=80"
      width={100}
      height={100}
    />
  ))
  .add('rounded', () => (
    <Image
      src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=1200&q=80"
      width={400}
      height={300}
      rounded
    />
  ))
  .add('lazyload', () => (
    <div
      css={`
        display: grid;
        grid-gap: 2rem;
        padding: 4rem;
      `}
    >
      <Image
        src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=1200&q=80"
        width={300}
        height={200}
      />
      <Image
        src="https://images.unsplash.com/photo-1542776949-3a3cae25c727?auto=format&fit=crop&w=1200&q=80"
        width={300}
        height={200}
      />
      <Image
        src="https://images.unsplash.com/photo-1542769494-0cc077eead4b?auto=format&fit=crop&w=1200&q=80"
        width={300}
        height={200}
      />
      <Image
        src="https://images.unsplash.com/photo-1542765570-2d49240a9a92?auto=format&fit=crop&w=1200&q=80"
        width={300}
        height={200}
      />
      <Image
        src="https://images.unsplash.com/photo-1542758854-648ba431dcd1?auto=format&fit=crop&w=1200&q=80"
        width={300}
        height={200}
      />
    </div>
  ))
