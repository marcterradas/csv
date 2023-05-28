// @ts-check
import chalk from 'chalk'

/**
 * @public
 * @void
 */
export function greetingsMessage () {
  console.log(chalk.green.bold('🐶 search rankings algorithm'))
}

/**
 * @public
 * @void
 */
export function startMessage () {
  console.log(chalk.bold('🔍 getting the information'))
}

/**
 * @public
 * @void
 */
export function calculatingRankingMessage () {
  console.log(chalk.bold('🧪 calculating rankings'))
}

/**
 * @public
 * @param {string} error
 * @void
 */
export function printError (error) {
  console.error(chalk.red(error))
}

/**
 * @public
 * @void
 */
export function generatingDocumentMessage () {
  console.log(chalk.bold('📄 generating sitters document'))
}

/**
 * @public
 * @void
 */
export function finishMessage () {
  console.log(chalk.green.bold('✅ document generated correctly'))
}
