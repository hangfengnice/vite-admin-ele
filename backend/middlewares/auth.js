module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).json({ code: 401, message: '未授权' })
  }
  // TODO: token 验证逻辑
  next()
}
