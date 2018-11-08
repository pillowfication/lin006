const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')

const PORT = process.argv[2] || process.env.LIN006_PORT || 80
const INDEX_PATH = path.resolve(__dirname, './dist/index.html')
const DB_PATH = path.resolve(__dirname, './db.txt')

const files = [ 'japan', 'malaysia', 'shanghai', 'south-korea', 'vietnam' ]
const attributes = [ 'intelligent', 'friendly', 'educated', 'attractive', 'trustworthy', 'humorous', 'self-confident', 'generous', 'leader-like', 'hard-working', 'clarity' ]
const surveyeeQuestions = [ 'born', 'residence', 'primary-language', 'parental-language' ]

function get (obj, path) {
  let node = obj
  for (const step of path) {
    node = node[step]
    if (!node) {
      return
    }
  }
  return node
}

const app = express()

app.use(bodyParser.json())

if (process.env.NODE_ENV === 'production') {
  app.use(compression({ level: 9 }))
}

app.use(express.static(path.resolve(__dirname, './dist')))

app.post('/api/submit', (request, response) => {
  const questionnaire = {}

  questionnaire.ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress
  questionnaire.startTime = get(request.body, [ 'startTime' ])
  questionnaire.endTime = get(request.body, [ 'endTime' ])

  for (const file of files) {
    questionnaire[file] = {}
    for (const attr of attributes) {
      questionnaire[file][attr] = get(request.body.state, [ file, attr ])
    }
  }

  questionnaire.surveyee = {}
  for (const quest of surveyeeQuestions) {
    questionnaire.surveyee[quest] = get(request.body.state, [ 'surveyee', quest ])
  }

  try {
    fs.appendFileSync(DB_PATH, JSON.stringify(questionnaire) + '\n')
  } catch (err) {
    console.log('Some error happened :(')
  }

  response.send('OK')
})

app.get('*', (_, response) => {
  response.sendFile(INDEX_PATH)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
