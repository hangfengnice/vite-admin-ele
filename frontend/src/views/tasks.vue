<template>
  <div class="tasks">
    <h2>任务列表</h2>

    <!-- 新增任务 -->
    <input
      v-model="newTask"
      @keyup.enter="addTasktodo"
      placeholder="输入新任务"
    />
    <button @click="addTasktodo">新增</button>

    <!-- 任务列表 -->
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input
          type="checkbox"
          v-model="task.completed"
          @change="updateTasktodo(task)"
        />
        <span :class="{ completed: task.completed }">{{ task.title }}</span>
        <button @click="deleteTasktodo(task.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '../utils/request.ts' // 使用封装好的 Axios

const tasks = ref([])
const newTask = ref('')

import { getTasks, addTask, updateTask, deleteTask } from '../api/tasks.js'

// 获取任务列表
const fetchTasks = async () => {
  try {
    tasks.value = await getTasks()
  } catch (err) {
    console.error(err)
  }
}

// 新增任务
const addTasktodo = async () => {
  const title = newTask.value.trim()
  if (!title) return
  try {
    const task = await addTask(title)
    tasks.value.push(task)
    newTask.value = ''
  } catch (err) {
    console.error(err)
  }
}

// 更新任务状态
const updateTasktodo = async (task) => {
  try {
    await updateTask(task.id, task.completed ? 1 : 0)
  } catch (err) {
    console.error(err)
  }
}

// 删除任务
const deleteTasktodo = async (id) => {
  try {
    await deleteTask(id)
    tasks.value = tasks.value.filter((t) => t.id !== id)
  } catch (err) {
    console.error(err)
  }
}

// 初始化
onMounted(fetchTasks)
</script>

<style scoped lang="scss">
.completed {
  text-decoration: line-through;
  color: gray;
}
.tasks input {
  margin-right: 5px;
}
.tasks button {
  margin-left: 5px;
}
</style>
