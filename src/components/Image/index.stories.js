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
    aspectRatio={1}
  />
)

export const Lazyload = () => (
  <div
    style={{ display: 'grid', gridGap: '2rem', padding: '4rem', width: 400 }}
  >
    {[...Array(100).keys()].map((_, i) => {
      const index = String(i).padStart(2, '0')
      return (
        <Image
          src={`https://placekitten.com/4${index}/4${index}`}
          key={index}
          width={400}
          height={400}
          aspectRatio={1 / 1}
          alt=""
          onLoad={() => console.log(`Image-${i} loaded`)}
        />
      )
    })}
  </div>
)
