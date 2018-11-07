const path = require('path')
const express = require('express')
const compression = require('compression')

const PORT = process.argv[2] || process.env.LIN006_PORT || 80
const INDEX_PATH = path.resolve(__dirname, './dist/index.html')

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(compression({ level: 9 }))
}

app.use(express.static(path.resolve(__dirname, './dist')))

app.get('*', (_, response) => {
  response.sendFile(INDEX_PATH)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
