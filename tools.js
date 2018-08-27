// 字符串转码
exports.html2Escape = html => {
  if (!html) {
    return html
  }
  return html.replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]))
}

// 自定义错误
class CheckFieldError extends Error {
  constructor(msg) {
    super(msg || '未知错误')
    this.state = 401
  }
}

exports.CheckFieldError = CheckFieldError
