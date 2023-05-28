import { expect, test } from 'vitest'
import { generateCSV } from '../../infrastructure/saver.js'

test('generate csv, empty data', function () {
  const filePath = './test/infrastructure/test.csv'
  const data = [{ email: 'user5398@verizon.net', name: 'Derek K.', profile_score: '0.77', ratings_score: '4.00', search_score: '4.65' }]
  expect(generateCSV(data, filePath)).toBe(true)
})
