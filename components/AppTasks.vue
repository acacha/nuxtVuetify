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
        <div v-for="task in filteredTasks" :key="task.id">
          <v-list-item>
            <v-list-item-action>
              <v-switch :value="task.completed" @click="toggle(task)"></v-switch
            ></v-list-item-action>
            <v-list-item-title>
              <span
                v-if="!(editing === task.id)"
                :class="{ completed: task.completed }"
                @dblclick="editTask(task)"
                >{{ task.title }}</span
              >
              <v-text-field
                v-else
                v-model="editedTask.title"
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
        <v-toolbar-title qa="footer_title"
          >{{ remaining }} Tasques pendents per fer</v-toolbar-title
        >
      </v-toolbar>
      <!--    TODO Toolbar tingui botons accions per filtrar: All / Active / Completed -->
      <ul class="filters">
        <li>
          <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
        </li>
        <li>
          <a href="#/active" :class="{ selected: visibility === 'active' }"
            >Active</a
          >
        </li>
        <li>
          <a
            href="#/completed"
            :class="{ selected: visibility === 'completed' }"
            >Completed</a
          >
        </li>
      </ul>
    </v-card>
  </div>
</template>

<script>
const filters = {
  all(tasks) {
    return tasks
  },
  active(tasks) {
    return tasks.filter(function (task) {
      return !task.completed
    })
  },
  completed(tasks) {
    return tasks.filter(function (task) {
      return task.completed
    })
  },
}

export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      editing: null,
      newTask: '',
      editedTask: null,
      visibility: 'all',
    }
  },
  computed: {
    filteredTasks() {
      return filters[this.visibility](this.tasks)
    },
    remaining() {
      return filters.active(this.tasks).length
    },
  },
  mounted() {
    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()
  },
  methods: {
    onHashChange() {
      const visibility = window.location.hash.replace(/#\/?/, '')
      if (filters[visibility]) {
        this.visibility = visibility
      } else {
        window.location.hash = ''
        this.visibility = 'all'
      }
    },
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
      this.editing = task.id
      this.beforeEditCache = task.title
      this.editedTask = { ...task }
    },

    doneEdit(task) {
      if (!this.editedTask) {
        return
      }
      this.$store.commit('tasks/edit', {
        task: this.editedTask,
        title: this.editedTask.title.trim(),
      })
      this.editedTask = null
      this.editing = null
    },

    cancelEdit(task) {
      this.editedTask = null
      this.editing = null
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
