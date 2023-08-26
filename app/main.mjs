import Koa from 'koa'
import ApiBuilder from 'koa-api-builder'
import bodyParser from 'koa-bodyparser'

import { insertBookRequest, listBooksRequest } from './components/books/requests.mjs'
import { loginRequest, signupRequest } from './components/auth/requests.mjs'
import { insertAuthorRequest, listAuthorsRequest } from './components/authors/requests.mjs'
import { isAuthenticated } from './configs/middleware.mjs'

export const app = new Koa()

const router = ApiBuilder().path(b => {
  b.get('/status', async ctx => ctx.body = 'ONLINE')
  b.post('/login', loginRequest)
  b.post('/signup', signupRequest)
  b.path('/authors', b => {
    b.get(listAuthorsRequest)
    b.post(isAuthenticated, insertAuthorRequest)
  })
  b.path('/books', b => {
    b.get(listBooksRequest)
    b.post(isAuthenticated, insertBookRequest)
  })
}).build()

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
