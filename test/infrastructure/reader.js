import { expect, test } from 'vitest'
import { getFileInformation } from '../../infrastructure/reader.js'

test('read csv file, validate invalid path and empty parameter', function () {
  expect(getFileInformation()).toBe(false)
  expect(getFileInformation('/somepath/somefile.csv')).toBe(false)
})

test('read csv file, if path is correct', function () {
  const filePath = './reviews.csv'
  expect(getFileInformation(filePath).length).toBe(500)
})
