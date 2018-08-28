// 字符串转码
exports.html2Escape = html => {
  if (!html) {
    return html
  }
  return html.replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]))
}
