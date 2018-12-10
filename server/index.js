const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev /* other next.js configs */ })
const handle = app.getRequestHandler()

const routes = [
  {
    path: '/github-users/:user',
    page: '/github-users',
    // page: '/github-users/user',
  },
  {
    path: '/test/path',
    page: '/github-users/user',
  },
]


app.prepare()
  .then(() => {
    const server = express()

    routes.forEach((route) => {
      server.get(route.path, (req, res) => {
        app.render(req, res, route.page, {
          ...req.params,
        })
      })
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
