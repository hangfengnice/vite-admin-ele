import request from '@/utils/request'

// 获取任务列表
export function getTasks() {
  return request.get('/tasks')
}

// 新增任务
export function addTask(title) {
  return request.post('/tasks', { title })
}

// 更新任务
export function updateTask(id, completed) {
  return request.put(`/tasks/${id}`, { completed })
}

// 删除任务
export function deleteTask(id) {
  return request.delete(`/tasks/${id}`)
}
