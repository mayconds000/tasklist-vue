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
            />
          </draggable>
        </nav>
      </div>
    </div>
  </section>
  <task-form
    :task="task"
    :show="showForm"
    @close-form="() => showForm = false"
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
        console.log(response)
        this.taskList = response.data || []
      })
      .catch (err => this.toastError(err)) 
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
    createTask (task) {
      this.loading = true
      axios.post(API_URL, task)
        .then(response => {
          this.taskList.push(response)
          this.loading = false
        })
        .catch(err => this.toastError(err))
    },
    updateTask (task) {
      axios.patch(API_URL + `/${task.id}`, task)
        .then(response => {
          this.taskList = this.taskList.map(item => {
            if (response.id == item.id) item = response
            return item
          })
        })
        .catch(err => this.toastError(err))
    },
    removeTask (task) {
      this.taskList = this.taskList.filter(item => item.id != task.id)
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