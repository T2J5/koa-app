'use strict'
// 引入 service 文件
const HomeService = require('../service/home')

module.exports = {
  index: async(ctx, next) => {
    await ctx.render('home/index', { title: 'iKcamp欢迎您' })
  },
  home: async (ctx, next) => {
    console.log(ctx.request.query);
    console.log(ctx.request.queryString);
    ctx.response.body = '<h1>Hello home</h1>'
  },
  ps: async (ctx, next) => {
    console.log(ctx.params);
    ctx.response.body = '<h1>Hello params</h1>'
  },
  login: async(ctx, next) => {
    await ctx.render('home/login', {
      btnName: 'GoGoGo'
    })
  },
  register: async(ctx, next) => {
    // 解构出 app 实例对象
    const { app } = ctx
    const { name, password } = ctx.request.body
    const res = await app.service.home.register(name, password)
    if(res.status == "-1"){
      await ctx.render("home/login", res.data)
    }else{
      ctx.state.title = "个人中心"
      await ctx.render("home/success", res.data)
    }
  }
}