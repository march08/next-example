const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev /* other next.js configs */ })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/github-users/:user', (req, res) => {
      const actualPage = '/github-users'
      const queryParams = { user: req.params.user }
      app.render(req, res, actualPage, queryParams /* { ...req.params } */)
    })

    server.get('*', (req, res) => handle(req, res))

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
