const app = require('./app')
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Node.js API 运行在端口 ${PORT}`)
})
