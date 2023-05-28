// this file is a configuration file for configuring vitest library for testing.
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    // detect all files inside test folder (add tsx and ts files if the project growth)
    include: ['**/test/infrastructure/*.{js,tsx,ts}', '**/test/application/*.{js,tsx,ts}', '**/test/domain/*.{js,tsx,ts}']
  }
})
