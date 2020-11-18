import { normalizeChars } from '.'

describe('normalizeChars', () => {
  it('Removes accentuated characters from a string', () => {
    expect(normalizeChars('Hé there!')).toBe('He there!')
    expect(normalizeChars('Heb jij nog ideeën?')).toBe('Heb jij nog ideeen?')
    expect(normalizeChars('¿Cómo estás?')).toBe('¿Como estas?')
    expect(normalizeChars('Você tem alguma ideia?')).toBe(
      'Voce tem alguma ideia?'
    )
  })
})
