'use strict'

const router = require('koa-router')()
const HomeController = require('./controller/home')

module.exports = function(app) {
  router.get('/', app.controller.home.index)
  router.get('/home', app.controller.home.home)
  router.get('/ps/:id/:name', app.controller.home.ps)
  // 增加返回表单页面的路由
  router.get('/user', app.controller.home.login)
  // 增加响应表单请求的路由
  router.post('/user/register', app.controller.home.register)
  app.use(router.routes())
    .use(router.allowedMethods())
}