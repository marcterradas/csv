import { expect, test } from 'vitest'
import { calculateSearchRanking } from '../../application/searchRanking'

test('calculate search ranking', function () {
  const dataFilePath = './reviews.csv'
  const resultFilePath = './sitters.csv'
  expect(calculateSearchRanking(dataFilePath, resultFilePath)).toBe(true)
})
