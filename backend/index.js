const app = require('./app')
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Node.js API 运行在端口 ${PORT}`)
})

const filter = (arr) => [...new Set(arr)]

function twosum(nums, target) {
  let map = {}
  map[nums[0]] = 0

  for (let i = 1; i < nums.length; i++) {
    let cur = nums[i]

    if (map[target - cur] != undefined) {
      return [map[target - cur], i]
    } else {
      map[cur] = i
    }
  }
}
