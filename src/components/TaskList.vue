<template>
<div>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-8-desktop">
        <nav class="box">
          <h1 class="title is-2"> Tarefas </h1>
          <b-button type="is-primary" @click.prevent="addTask">Adicionar tarefas</b-button>
          <hr />
          <div class="is-clearfix"></div>
          <draggable
            v-model="taskList" 
            draggable=".task-item"
            @start="dragging = true" 
            @end="dragging = false"
          >
            <task-item
              v-for="(task, idx) in taskList" 
              :task="task" 
              :key="idx"
              @edit-task="editTask"
              @remove-task="removeTask"
              @change-status="changeStatusTask"
            />
          </draggable>
        </nav>
      </div>
    </div>
  </section>
  <task-form
    :task="task"
    :show="showForm"
    :loading="loading"
    @close-form="() => showForm = false"
    @create-task="createTask"
    @update-task="updateTask"
  />
</div>
</template>

<script>

import draggable from 'vuedraggable'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/tasks'

export default {
  components: {
    draggable,
    TaskItem,
    TaskForm
  },
  data () {
    return {
      enabled: true,
      dragging: false,
      loading: false,
      taskList: [],
      task: { title: '' },
      showForm: false
    }
  },
  created () {
    axios.get(API_URL)
      .then(response => {
        this.taskList = response.data || []
      })
      .catch (err => this.toastError(err)) 
  },
  watch: {
    taskList: {
      deep: true,
      handler (newValue) {
        // this.taskList = [...newValue]
      }
    }
  },
  methods: {
    editTask (task) {
      this.task = task
      this.showForm = true
    },
    addTask () {
      this.task = { title: '' }
      this.showForm = true
    },
    createTask (title) {
      this.loading = true
      axios.post(API_URL, { title })
        .then(response => {
          this.taskList.unshift(response.data)
          this.loading = false
          this.showForm = false
        })
        .catch(err => this.toastError(err))
    },
    updateTask (taskId, title) {
      this.loading = true
      axios.patch(API_URL + `/${taskId}`, { title })
        .then(response => {
          const task = response.data
          this.taskList = this.taskList.map(item => {
            if (task.id == item.id) item = task
            return item
          })
          this.loading = false
          this.showForm = false
        })
        .catch(err => this.toastError(err))
    },
    removeTask (taskId) {
      axios.delete(API_URL + `/${taskId}`)
        .then(response => {
          this.taskList = this.taskList.filter(item => item.id != taskId)
        })
        .catch(err => this.toastError(err))
    },
    changeStatusTask (task) {
      console.log(task)
      const newStatus = task.status == 'closed' ? 'open' : 'closed'
      axios.patch(API_URL + `/${task.id}`, {status: newStatus})
        .then(response => {
          const index = this.taskList.findIndex(item => item.id == task.id)
          this.$set(this.taskList, index, response.data)
        })
        .catch(err => this.toastError(err))
    },
    toastError (message) {
      this.$toast.open({
        duration: 5000,
        message,
        position: 'is-top-right',
        type: 'is-danger'
      })
    }
  }
}
</script>

<style >
  .has-text-line-through {
    text-decoration: line-through
  }
</style>