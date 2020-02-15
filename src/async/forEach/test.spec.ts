import asyncForEach from '.'
import { doNothing } from '../../../testUtils'

describe('asyncForEach', () => {
  let testFunction: jest.Mock
  const testArray = [1, 2, 3, 4]

  beforeEach(() => {
    testFunction = jest.fn()
  })

  it('iterates through the whole array', async () => {
    await asyncForEach(testArray, testFunction)
    expect(testFunction).toBeCalledTimes(4)
  })

  it('stops', async () => {
    testFunction
      .mockImplementationOnce(doNothing)
      .mockImplementationOnce(doNothing)
      .mockImplementationOnce((a, b, c, stop) => Promise.resolve(stop()))

    await asyncForEach(testArray, testFunction)
    expect(testFunction).toBeCalledTimes(3)
  })
})
