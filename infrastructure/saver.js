// @ts-check

import fs from 'fs'
import { printError } from './messages.js'
const COLUMNS_NAMES = ['Sitter email', 'Sitter name', 'Profile Score', 'Ratings Score', 'Search Score']

/**
 * @public
 * @param {Object[]} data
 * @param {string} filePath
 * @returns {boolean}
 */
export function generateCSV (data, filePath) {
  let csv = COLUMNS_NAMES.join(',') + '\n'

  data.forEach((item) => {
    const row = [
      item.email,
      item.name,
      item.profile_score,
      item.ratings_score,
      item.search_score
    ]
    csv += `${row.join(',')}\n`
  })

  try {
    fs.writeFileSync(filePath, csv)
    return true
  } catch (err) {
    printError(err)
    return false
  }
}
