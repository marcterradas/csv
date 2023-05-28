import fs from 'fs'
import { expect, test } from 'vitest'
import { searchRankingAlgorithm } from '../../domain/searchRankingAlgorithm'

test('search ranking algorithm', function () {
  fs.readFile('./test/domain/data.json', 'utf8', (err, data) => {
    console.error(err)
    const response = searchRankingAlgorithm(JSON.parse(data))
    expect(Object.values(response).length).toBe(100)
  })
})
