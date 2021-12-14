const express = require('express')
const res = require('express/lib/response')
const fs = require('fs')

const app = express()
const port = 5900
const tokenPath = 'token'
const objectPath = 'object'
let writeObjectPromise = Promise.resolve() // dummy promise

let token
try {
  token = fs.readFileSync(tokenPath, 'utf8').trim()
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error(`Could not find token file '${tokenPath}' in working directory.`)
  } else {
    console.error(err)
  }
  process.exit(1)
}

let object
try {
  object = fs.readFileSync(objectPath, 'utf8').trim()
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error(`Could not find synced object '${objectPath}' in working directory.`)
  } else {
    console.error(err)
  }
  process.exit(1)
}

app.use(express.json())

app.get('/', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.send(object)
})

app.post('/', (req, res) => {
  object = req.body
  res.end()

  writeObjectPromise = (async () => {
    await writeObjectPromise
    
    try {
      await fs.promises.writeFile(objectPath, JSON.stringify(req.body))
    } catch (err) {
      console.error(err)
    }
  })()
})

app.listen(port, "127.0.0.1", () => {
  console.log(`Listening on http://127.0.0.1:${port}`)
})
