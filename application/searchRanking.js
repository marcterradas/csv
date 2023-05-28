// @ts-check

import { getFileInformation } from '../infrastructure/reader.js'
import { generateCSV } from '../infrastructure/saver.js'
import { greetingsMessage, startMessage, calculatingRankingMessage, generatingDocumentMessage, finishMessage } from '../infrastructure/messages.js'
import { searchRankingAlgorithm } from '../domain/searchRankingAlgorithm.js'

/**
 * @public
 * @param {string} dataFilePath
 * @param {string} resultFilePath
 * @returns {boolean}
 */
export function calculateSearchRanking (dataFilePath, resultFilePath) {
  greetingsMessage()
  startMessage()

  /** @type {Object | false} */
  const data = getFileInformation(dataFilePath)
  if (!data) return false

  calculatingRankingMessage()
  /** @type {Object[]} */
  const sitters = searchRankingAlgorithm(data)

  generatingDocumentMessage()
  /** @type {boolean} */
  const result = generateCSV(sitters, resultFilePath)
  if (!result) return false

  finishMessage()

  return true
}
