<template>
  <div>
    <!--    // TODO ALERTs: En cas d'error i en cas de missatge: Tasca afegida correctament-->
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Tasques</v-toolbar-title>
      </v-toolbar>
      <!--    TODO Toolbar tingui botons accions per: tancar(no mostrar), maximitzar, minimitzar -->
      <v-toolbar>
        <v-form class="d-flex align-baseline" @submit.prevent="addTask">
          <v-text-field
            v-model="newTask"
            autofocus
            autocomplete="off"
            placeholder="Que cal fer?"
            @keyup.enter="addTask"
          ></v-text-field>
          <v-btn class="ml-2" color="primary" @click="addTask">Afegir</v-btn>
        </v-form>
      </v-toolbar>
      <v-list>
        <div v-for="task in tasks" :key="task.id">
          <v-list-item>
            <v-list-item-action>
              <v-switch @click="toggle(task)"></v-switch
            ></v-list-item-action>
            <v-list-item-title>
              <span
                v-if="!editedTask"
                :class="{ completed: task.completed }"
                @dblclick="editTask(task)"
                >{{ task.title }}</span
              >
              <v-text-field
                v-if="editedTask"
                v-model="task.title"
                autofocus
                @blur="doneEdit(task)"
                @keyup.enter="doneEdit(task)"
                @keyup.esc="cancelEdit(task)"
              ></v-text-field>
            </v-list-item-title>
            <v-list-item-action>
              <v-btn color="success" icon @click="editTask(task)">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn color="error" icon @click="removeTask(task)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
      <v-toolbar>
        <v-toolbar-title>3 Tasques pendents per fer</v-toolbar-title>
      </v-toolbar>
      <!--    TODO Toolbar tingui botons accions per filtrar: All / Active / Completed -->
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newTask: '',
      editedTask: null,
      visibility: 'all',
    }
  },
  methods: {
    addTask() {
      const value = this.newTask && this.newTask.trim()
      if (!value) {
        return
      }
      this.$store.commit('tasks/add', this.newTask)
      this.newTask = ''
    },
    removeTask(task) {
      this.$store.commit('tasks/remove', task)
    },

    editTask(task) {
      this.beforeEditCache = task.title
      this.editedTask = task
    },

    doneEdit(task) {
      if (!this.editedTask) {
        return
      }
      this.editedTask = null
      this.$store.commit('tasks/edit', { task, title: task.title.trim() })
    },

    cancelEdit(task) {
      this.editedTask = null
      this.$store.commit('tasks/edit', { task, title: this.beforeEditCache })
    },

    toggle(task) {
      this.$store.commit('tasks/toggle', task)
    },

    // removeCompleted() {
    //   this.tasks = filters.active(this.tasks)
    // },
  },
}
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
