<template>
  <div class="columns is-mobile task-item" :class="{'move': move}">
    <div class="column is-8-mobile is-8-tablet is-8-desktop is-10-widscreen  has-text-left task-item__title">
      <div class="field">
        <b-checkbox 
          :value="item.status == 'closed'" 
          @click.prevent.native="$emit('change-status', item)" 
          class="is-size-7"
          :class="{'has-text-line-through': item.status == 'closed'}"
        >
          <span >{{ item.title }}</span>
        </b-checkbox>
      </div>
    </div>
    <div class="column">
      <div class="buttons is-pulled-right" >
        <b-button 
          icon-right="edit" 
          size="is-small" 
          @click="$emit('edit-task', item)" 
        />
        <b-button 
          icon-right="trash" 
          size="is-small" 
          @click="$emit('remove-task', item.id)" 
        />

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      required: true
    },
    move: {
      default: true
    }
  },
  data () {
    return {
      item: {}
    }
  },
  created () {
    this.item = {...this.task}
  },
  watch: {
    task (newTask) {
      this.item = {...newTask}
    }
  }
}
</script>

<style scoped>
  .task-item.move:hover {
    background-color: #eee;
    cursor: move;
  }
  .task-item__title {
    display: flex !important;
    align-items: center;
  }
</style>
