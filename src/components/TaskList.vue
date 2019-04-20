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
import { mapState } from 'vuex'

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
      taskList: [],
      task: { title: '' },
      showForm: false
    }
  },
  computed: {
    ...mapState(['list'])
  },
  created () {
    this.taskList = this.list
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
      // send via post
      // map result 
      // insert in list
    },
    updateTask (task) {
      this.taskList = this.taskList.map(item => {
        if (task.id == item.id) item = task
        return item
      })
    },
    removeTask (task) {
      this.taskList = this.taskList.filter(item => item.id != task.id)
    }
  }
}
</script>

<style >
  .has-text-line-through {
    text-decoration: line-through
  }
</style>