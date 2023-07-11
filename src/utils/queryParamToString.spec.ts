import { queryParamToString } from './queryParamToString'

describe('Receive a parameter and return string or undefined', () => {
  it('should return a string with the array items joined', () => {
    expect(queryParamToString(['Hello', 'world'])).toBe('Hello,world')
  })

  it('should return a string when the parameter is a string', () => {
    expect(queryParamToString('Hello')).toBe('Hello')
  })

  it('should return an empty string if the parameter is falsy', () => {
    expect(queryParamToString(undefined)).toBe('')
  })
})
