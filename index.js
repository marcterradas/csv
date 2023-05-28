// @ts-check

import { calculateSearchRanking } from './application/searchRanking.js'

const dataFilePath = './reviews.csv'
const resultFilePath = './sitters.csv'

// entry point of the application
calculateSearchRanking(dataFilePath, resultFilePath)
