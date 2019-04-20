<template>
  <div class="modal is-clipped" :class="{'is-active': show}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Tarefa</p>
        <button class="delete" aria-label="close" @click.prevent="$emit('close-form')"></button>
      </header>
      <section class="modal-card-body">
        <b-field label="Título">
          <b-input v-model="title" :value="task.title || title"></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <div class="level" style="width: 100%;">
          <div class="level-left"></div>
          <div class="level-right">
            <div class="level-item">
              <button class="button" @click.prevent="$emit('close-form')">Cancelar</button>
              <template v-if="loading">
                <button class="button is-info is-loading"></button>
              </template>
              <template v-else>
                <b-button 
                  class="button is-success" 
                  v-if="task.id != null" 
                  :disabled="!title"
                  @click.prevent="$emit('update-task', task.id, title)"
                  >
                    Salvar alterações
                  </b-button>
                <b-button 
                  class="button is-success" 
                  :disabled="!title"
                  @click.prevent="$emit('create-task', title)"
                  v-else 
                >
                  Adicionar Tarefa
                </b-button>
              </template>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      default: () => ({
        id: null,
        title: '',
        status: 'open'
      })
    },
    show: {
      required: true,
      default: false
    },
    loading: {
      default: false
    }
  },
  data () {
    return {
      title: ''
    }
  },
  watch: {
    task (newValue) {
      this.title = newValue.title
    }
  }
}
</script>