import { getColorsArray } from '.'

const spaceVariantsArray = [
  {
    name: 'space',
    color: 'var(--space)',
  },
  {
    name: 'spaceDark',
    color: 'var(--spaceDark)',
  },
  {
    name: 'spaceMedium',
    color: 'var(--spaceMedium)',
  },
  {
    name: 'spaceMediumAlpha',
    color: 'var(--spaceMediumAlpha)',
  },
  {
    name: 'spaceLight',
    color: 'var(--spaceLight)',
  },
  {
    name: 'spaceLightAlpha',
    color: 'var(--spaceLightAlpha)',
  },
  {
    name: 'spaceLighter',
    color: 'var(--spaceLighter)',
  },
  {
    name: 'spaceLighterAlpha',
    color: 'var(--spaceLighterAlpha)',
  },
  {
    name: 'spaceLightest',
    color: 'var(--spaceLightest)',
  },
  {
    name: 'spaceLightestAlpha',
    color: 'var(--spaceLightestAlpha)',
  },
]

describe('getColorsArray', () => {
  it('returns the variants of the colors', () => {
    expect(getColorsArray('space')).toEqual(spaceVariantsArray)
  })
})
