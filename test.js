/*
 * 简单测试
 * TODO: 引入测试用例
 * @Author: 56 
 * @Date: 2018-08-27 15:08:21 
 * @Last Modified by: 56
 * @Last Modified time: 2018-08-27 15:18:17
 */
const validator = require('./index')

const validations = {
  account: {
    type: 'string',
    must: true,
    match: /^[a-zA-Z][a-zA-Z0-9_-]{1,15}$/,
    label: '账户',
  },
  password: {
    type: 'string',
    must: true,
    match: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
    label: '密码',
  },
}

try {
  const data = validator({ account: 'admin', password: 'admin123' }, validations)
  console.log('data', data)
  
  validator({ account: 'admin', password: '123456' }, validations)
} catch (error) {
  console.error('error', error)
}
