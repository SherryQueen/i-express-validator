/*
 * 表单数据校验用
 * 支持 数字, 字符串, 日期  等格式
 * TODO: 分割代码
 * @Author: 56 
 * @Date: 2018-03-11 15:47:39 
 * @Last Modified by: 56
 * @Last Modified time: 2018-08-28 17:03:13
 */
const { html2Escape } = require('./tools')

/**
 * 按校验规则对数据进行校验
 * @param {Object}  obj         要校验的对象
 * @param {Object}  validations 校验规则
 * @param {Boolean} isUpdate    是否处于更新状态
 */
module.exports = function(obj, validations, isUpdate = false) {
  if (!validations) {
    throw new Error('校验规则定义错误')
  }

  let value,
    validation,
    label,
    isString = false,
    isNumber = false

  obj = obj || {}
  const newObj = {}
  for (let key in validations) {
    validation = validations[key]
    if (!validation) {
      continue
    }
    label = validation.label
    value = obj[key]
    // 对特殊字符进行转义
    value = html2Escape(value)
    if (value === 'undefined' || value === 'null') {
      throw new Error('包含不允许的字符')
    }
    // 检查数据是否存在
    if (value === undefined) {
      // 如果有默认值
      if (validation.default) {
        value = validation.default
        if (value !== 'empty') {
          newObj[key] = value
        }
        continue
      }
      // 不处于更新状态, 或值不可为空
      if (!isUpdate || !validation.nullable) {
        throw new Error(`${label}不能为空`)
      } else if (validation.must) {
        // 必须要有该值
        throw new Error(`${label}未填写`)
      } else {
        continue
      }
    }
    // 若为字符串
    if (typeof value === 'string') {
      value = value.trim()
      isString = true
    }
    // 如果要求是字符串
    if (validation.type === 'string') {
      if (!isString) {
        throw new Error(`${label}必须为字符串`)
      }
      if (!value) {
        throw new Error(`${label}不能为空字符串`)
      }
      if (validation.max !== undefined && validation.max < value.length) {
        throw new Error(`${label}长度不能大于${validation.max}`)
      }
      if (validation.min !== undefined && validation.min > value.length) {
        throw new Error(`${label}长度不能小于${validation.min}`)
      }
      // 枚举要求
      if (validation.enum && !validation.enum.some(item => item + '' === value + '')) {
        throw new Error(`${label}类型不正确`)
      }
      // 正则匹配
      if (validation.match) {
        // 重置正则匹配位置
        validation.match.lastIndex = 0
        if (!validation.match.test(value)) {
          throw new Error(`${label}输入不正确`)
        }
      }
    } else if (validation.type === 'number') {
      // 若为数字, 只支持整数
      value = parseInt(value)
      if (isNaN(value)) {
        throw new Error(`${label}不是一个有效的数字`)
      }
      isNumber = true
      // 数字校验
      if (!isNumber) {
        throw new Error(`${label}必须为数字`)
      }
      if (validation.max !== undefined && validation.max < value) {
        throw new Error(`${label}不能大于${validation.max}`)
      }
      if (validation.min !== undefined && validation.min > value) {
        throw new Error(`${label}不能小于${validation.min}`)
      }
    } else if (validation.type === 'date') {
      // 日期校验
      const date = new Date(value)
      if (isNaN(date.getDate())) {
        throw new Error(`${label}是一个错误的日期格式`)
      }
    } else {
      throw new Error(`${label}: 未知的数据类型`)
    }
    newObj[key] = value
  }
  return newObj
}
