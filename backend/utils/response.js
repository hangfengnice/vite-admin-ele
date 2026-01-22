module.exports = {
  success: (res, data = null, message = 'ok') => {
    res.status(200).json({ code: 0, message, data })
  },
  error: (res, message = 'error', code = 500, data = null) => {
    res.status(code === 0 ? 500 : code).json({
      code,
      message,
      data,
    })
  },
}
