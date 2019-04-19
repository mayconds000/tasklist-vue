<template>
  <div class="panel-block">
    <div class="level">
      <div class="level-left">
        <template v-if=" ! isEdit">
          <input type="checkbox" :id="'task' + item.id" @click.prevent="changeStatus">
          <label :for="'task' + item.id">{{ item.title }}</label>
        </template>
        <tempalte v-else>
          <input type="text" class="" v-model="item.title" />
        </tempalte>

      </div>

      <div class="level-right">
        <div class="buttons">
          <a class="button" @click="edit" v-show=" ! isEdit">
            <span class="icon is-small">
              <i class="fas fa-edit"></i>
            </span>
          </a>

          <a class="button" @click="remove">
            <span class="icon is-small">
              <i class="fas fa-trash"></i>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task'],
  data: {
    isEdit: false,
    item: {},
  },
  created () {
    this.item = {...this.task}
  },
  methods: {
    changeStatus (e) {
      console.log(e)
    },
    edit () {

    },
    update () {

    },
    remove () {

    }
  }
}
</script>