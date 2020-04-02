import React from 'react'
import { Image } from './'

export default {
  title: 'Image',
}

export const Basic = () => (
  <Image src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=1200&q=80" />
)

export const FourByThree = () => (
  <Image
    src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=300"
    width={400}
    height={300}
  />
)

FourByThree.story = {
  name: '4x3',
}

export const Square = () => (
  <Image
    src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=1200&q=80"
    width={100}
    height={100}
  />
)

export const Rounded = () => (
  <Image
    src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=1200&q=80"
    width={400}
    height={300}
    rounded
  />
)

export const Lazyload = () => (
  <div style={{ display: 'grid', gridGap: '2rem', padding: '4rem' }}>
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
)
