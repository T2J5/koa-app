'use strict'

const Koa = require('koa')

// 引入中间件
const middleware = require('./middleware')

const router = require('./router')

const app = new Koa()

middleware(app)


// 调用路由中间件
router(app)

app.listen(3000)

console.log('[demo] start-quick is starting at port 3000')
