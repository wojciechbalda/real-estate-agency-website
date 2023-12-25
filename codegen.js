const { loadEnvConfig } = require('@next/env')

const projectDir = process.cwd()
loadEnvConfig(projectDir)

module.exports = {
  overwrite: true,
  schema: process.env.HYGRAPH_TYPES_ENDPOINT,
  generates: {
    'gen-types.ts': {
      documents: './app/lib/fetch.ts',
      plugins: [
        'typescript',
        'typescript-operations'
      ]
    }
  }
}



