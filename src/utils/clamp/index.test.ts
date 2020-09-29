import { clamp } from '.'

describe('clamp()', () => {
  const min = 1
  const max = 3

  it('returns value if value === min', () => {
    const v = 1
    expect(clamp(v, min, max)).toEqual(v)
  })

  it('returns value if value > min and < max', () => {
    const v = 2
    expect(clamp(v, min, max)).toEqual(v)
  })

  it('returns value if value === max', () => {
    const v = 3
    expect(clamp(v, min, max)).toEqual(v)
  })

  it('returns min if value < min', () => {
    const v = 0
    expect(clamp(v, min, max)).toEqual(min)
  })

  it('returns max if value > max', () => {
    const v = 4
    expect(clamp(v, min, max)).toEqual(max)
  })

  it('returns larger boundary if min > max', () => {
    const v = 4
    expect(clamp(v, max, min)).toEqual(max)
  })
})
