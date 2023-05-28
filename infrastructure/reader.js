// @ts-check

import fs from 'fs'
import { printError } from './messages.js'

/**
 * @public
 * Reads a CSV file and parses its contents.
 * @param {string} filePath - The path of the CSV file.
 * @returns {Object | false} A json representing the parsed CSV data, or false if the reader couldn't read the file.
 */
export function getFileInformation (filePath = '') {
  if (filePath === '') return false

  /** @type {string | false} */
  const fileContent = readFile(filePath)

  if (!fileContent) return false

  /** @type {string[]} */
  const headers = getHeadersFromFile(fileContent)

  /** @type {Object} json */
  const data = getDataFromFile(headers, fileContent)

  return data
}

/**
 * @private
 * read csv file
 * @param {string} filePath
 * @returns {string | false}
 */
function readFile (filePath) {
  try {
    /** @type {string} */
    let fileContent = fs.readFileSync(filePath, 'utf-8')

    // clean data
    fileContent = fileContent.replaceAll('\r', '')

    return fileContent
  } catch (error) {
    printError(error)
    return false
  }
}

/**
 * @private
 * get headers from csv file
 * @param {string} fileContent
 * @returns {string[]}
 */
function getHeadersFromFile (fileContent) {
  /** @type {string[]} */
  const lines = fileContent.split('\n')
  /** @type {string[]} */
  const headers = lines[0].split(',')

  return headers
}

/**
 * @private
 * get data from csv
 * @param {string[]} headers
 * @param {string} fileContent
 * @returns {Object} json with data information
 */
function getDataFromFile (headers, fileContent) {
  /**  @type {string[]} */
  const lines = fileContent.split('\n')
  lines.pop()

  /** @type string[] */
  const [, ...data] = lines

  return data.map(element => {
    /** @type {{}} */
    const formattedValue = {}
    /** @type {string[]} */
    const values = element.split(',')

    for (let i = 0; i < headers.length; i++) {
      formattedValue[headers[i]] = values[i]
    }

    return formattedValue
  })
}
