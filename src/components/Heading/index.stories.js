import React from 'react'
import { storiesOf } from '@storybook/react'
import { H1, H2, H3, H4, H5, H6 } from './'

storiesOf('Heading', module)
  .add('heading 1', () => (
    <H1>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro corporis
      nobis ipsam cupiditate magni. Ratione recusandae tempore nemo ipsa
      perferendis.
    </H1>
  ))
  .add('heading 2', () => (
    <H2>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro corporis
      nobis ipsam cupiditate magni. Ratione recusandae tempore nemo ipsa
      perferendis.
    </H2>
  ))
  .add('heading 3', () => (
    <H3>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro corporis
      nobis ipsam cupiditate magni. Ratione recusandae tempore nemo ipsa
      perferendis.
    </H3>
  ))
  .add('heading 4', () => (
    <H4>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro corporis
      nobis ipsam cupiditate magni. Ratione recusandae tempore nemo ipsa
      perferendis.
    </H4>
  ))
  .add('heading 5', () => (
    <H5>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro corporis
      nobis ipsam cupiditate magni. Ratione recusandae tempore nemo ipsa
      perferendis.
    </H5>
  ))
  .add('heading 6', () => (
    <H6>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro corporis
      nobis ipsam cupiditate magni. Ratione recusandae tempore nemo ipsa
      perferendis.
    </H6>
  ))
