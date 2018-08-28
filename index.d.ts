declare const validator: validator.Validator

declare namespace validator {
  type Validator = (obj: any, validations: Validations, isUpdate?: boolean) => object

  export interface ValidationItem {
    label: string // 校验项名称
    type: 'string' | 'number' | 'date' // 字段类型
    default?: string | number // 校验项默认值
    nullable?: boolean // 更新状态下是否可空
    must?: boolean // 是否为必填项
    max?: number // string 类型 最大长度 number 类型最大值
    min?: number // string 类型 最小长度 number 类型最小值
    match?: RegExp // 正则匹配
    enum?: string[] | number[] // 枚举类型
  }

  export interface Validations {
    [key: string]: ValidationItem
  }
}

export = validator
