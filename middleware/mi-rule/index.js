'use strict'

const path = require('path')
const fs = require('fs')

module.exports = function (opts) {
  // opts 是参数对象，里面包含了实例 app，用来挂载指定的目录文件。rules 是我们指定的目录规则
  const { app, rules = [] } = opts

  // 检测App 是否存在 如果参数缺少实例 app，则抛出错误
  if (!app) {
    throw new Error('the app params necessary! ')
  }
  //  提取出 app 实例对象中的属性名
  const appKeys = Object.keys(app)
  rules.forEach((item) => {
    let { folder, name } = item
    // 如果 app 实例中已经存在了传入过来的属性名，则抛出错误
    if (appKeys.includes(name)) {
      throw new Error(`the name of ${name} already exists!`)
    }
    let content = {};
    //读取指定文件夹下(dir)的所有文件并遍历
    fs.readdirSync(folder).forEach(filename => {
      //取出文件的后缀
      const extname = path.extname(filename)
      //只处理js文件
      if (extname === '.js') {
        //将文件名中去掉后缀
        const name = path.basename(filename, extname)
        //读取文件中的内容并赋值绑定
        content[name] = require(path.join(folder, filename))
      }
    })
    app[name] = content
  })
}