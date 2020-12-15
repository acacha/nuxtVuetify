<template>
  <div>
    <!--    // TODO ALERTs: En cas d'error i en cas de missatge: Tasca afegida correctament-->
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Tasques</v-toolbar-title>
      </v-toolbar>
      <!--    TODO Toolbar tingui botons accions per: tancar(no mostrar), maximitzar, minimitzar -->
      <v-toolbar>
        <v-form class="d-flex align-baseline" @submit.prevent="">
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
              <!--              v-model -> SYNTAX SUGAR-->
              <v-switch v-model="task.completed"></v-switch>
              <!--              // DATA BINDING: One way || Two way-->
              <!--              <v-switch-->
              <!--                :value="task.completed"-->
              <!--                @change="task.completed = $event.target.value"-->
              <!--              ></v-switch>-->
            </v-list-item-action>
            <v-list-item-title>
              <v-text-field
                v-if="editing.id === task.id"
                v-model="editing.title"
                autofocus
                @keydown.enter="editTask"
              ></v-text-field>
              <span v-else @dblclick="initEditingProcess(task)">{{
                task.title
              }}</span>
            </v-list-item-title>
            <v-list-item-action>
              <v-btn color="success" icon @click="initEditingProcess(task)">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn color="error" icon @click="initDeleteProcess(task)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
      <v-toolbar>
        <v-toolbar-title qa="footer_title">
          <span v-show="remaining === 0"
            >Enhorabona! No tens cap tasca pendent de fer</span
          >

          <span v-show="remaining === 1"
            >{{ remaining }} Tasca pendent de fer</span
          >

          <span v-show="remaining > 1"
            >{{ remaining }} Tasques pendents de fer</span
          >

          | Completed: {{ completed }}
        </v-toolbar-title>
      </v-toolbar>
      <!--    TODO Toolbar tingui botons accions per filtrar: All / Active / Completed -->
    </v-card>

    <ul class="filters">
      <li>
        <a
          href="#/all"
          :class="{ selected: visibility === 'all' }"
          qa="filter_all"
          >All</a
        >
      </li>
      <li>
        <a
          href="#/active"
          :class="{ selected: visibility === 'active' }"
          qa="filter_pending"
          >Active</a
        >
      </li>
      <li>
        <a
          href="#/completed"
          :class="{ selected: visibility === 'completed' }"
          qa="filter_completed"
          >Completed</a
        >
      </li>
    </ul>

    <v-snackbar v-model="showSnackbar">
      {{ snackBarMessage }}
    </v-snackbar>

    <v-dialog :value="showDeleteConfirmationDialog" max-width="290">
      <v-card>
        <v-card-title>Esteu segurs?</v-card-title>
        <v-card-text
          >Tingueu en compte que les tasques esborrades no es poden
          recuperar.</v-card-text
        >
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            qa="cancel_button"
            @click="showDeleteConfirmationDialog = false"
            >Cancel·lar</v-btn
          >
          <v-btn color="error" qa="delete_button" @click="deleteTask(task)"
            >Eliminar</v-btn
          >
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

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

// const STORAGE_KEY = 'todos-vuejs-2.0'

// const tasksStorage = {
//   fetch() {
//     const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
//     //    todos.forEach(function (todo, index) {
//     //      todo.id = index
//     //    })
//     //  todoStorage.uid = todos.length
//     return todos
//   },
//   save(todos) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
//   },
// }

// const tasksStorageApi = {
//   fetch() {
//     // CLIENT HTTP
//     // AXIOS -> NUXT AXIOS -> SSR
//   },
//   save(todos) {},
// }

const vue = {
  name: 'Tasks',
  data() {
    return {
      snackBarMessage: '',
      editing: {},
      tasks: [],
      newTask: '',
      showSnackbar: false,
      showDeleteConfirmationDialog: false,
      visibility: 'all',
    }
  },
  computed: {
    filteredTasks() {
      // return this.tasks
      return filters[this.visibility](this.tasks)
    },
    remaining() {
      // return this.tasks.length
      return this.tasks.filter((task) => !task.completed).length
      // return this.tasks.filter(function (task) {
      //   return task.completed === false
      // })
    },
    completed() {
      // return this.tasks.length
      return this.tasks.filter((task) => task.completed).length
      // return this.tasks.filter(function (task) {
      //   return task.completed === false
      // })
    },
  },
  watch: {
    tasks: {
      handler(tasks) {
        // tasksStorage.save(tasks)
        // PUT http://localhost:8000/api/v1/user/tasks -> tasks
        // $axios
        this.$axios.setToken(
          'vXrBmYo4BnIEFECvqKjMYqfLphS8ffPMyqjK6Qri',
          'Bearer'
        )
        const response = this.$axios.$put(
          'http://localhost:8000/api/v1/user/tasks',
          {
            tasks: this.tasks,
          }
        )
        console.log(response)
      },
      deep: true,
    },
  },
  async asyncData({ $axios }) {
    // asyncData(ctx) {
    //   ctx.$axios
    // JAVASCRIPT then catch -> PROMISES -> async /await -> PROMISES HELL CALLBACK
    $axios.setToken('vXrBmYo4BnIEFECvqKjMYqfLphS8ffPMyqjK6Qri', 'Bearer')
    // await $axios.$get('http://laravelserver.test/api/v1/user/tasks')
    const response = await $axios.$get(
      'http://localhost:8000/api/v1/user/tasks'
    )
    console.log(response)
    console.log('ASYNC DATA')
    // console.log('CTX:')
    // console.log(ctx)
    // ctx -> Context
    return {
      tasks: response,
      //   [
      //   {
      //     id: 1,
      //     title: 'Pariatur dolor eos aperiam vitae dolor et.',
      //     completed: false,
      //     user_id: '1',
      //     created_at: '2020-12-14T16:34:11.000000Z',
      //     updated_at: '2020-12-14T16:34:11.000000Z',
      //   },
      //   {
      //     id: 2,
      //     title: 'Corporis ut sunt placeat magni.',
      //     completed: false,
      //     user_id: '1',
      //     created_at: '2020-12-14T16:34:11.000000Z',
      //     updated_at: '2020-12-14T16:34:11.000000Z',
      //   },
      //   {
      //     id: 3,
      //     title: 'Corporis ut sunt placeat magni.',
      //     completed: false,
      //     user_id: '1',
      //     created_at: '2020-12-14T16:34:11.000000Z',
      //     updated_at: '2020-12-14T16:34:11.000000Z',
      //   },
      // ],
    }
  },
  mounted() {
    console.log('######################## MOUNTED')
    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()
    // this.tasks = tasksStorage.fetch()
  },
  methods: {
    onHashChange() {
      const visibility = window.location.hash.replace(/#\/?/, '')
      // VISIBILITY: all / completed / pending
      if (filters[visibility]) {
        this.visibility = visibility
      } else {
        window.location.hash = ''
        this.visibility = 'all'
      }
    },
    addTask() {
      // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array
      // ARRAYS -> COLLECTIONS
      this.tasks.push({
        id: uuidv4(),
        title: this.newTask,
        completed: false,
      })
      this.newTask = ''
      this.snackBarMessage = 'Tasca afegida correctament!'
      this.showSnackbar = true
    },
    editTask() {
      const task = this.tasks.find((t) => t.id === this.editing.id)
      task.title = this.editing.title
      this.editing = {}
      this.snackBarMessage = 'Tasca modificada correctament!'
      this.showSnackbar = true
    },
    initEditingProcess(task) {
      // this.editing.id = task.id
      // this.editing.title = task.title
      this.editing = task
    },
    initDeleteProcess(task) {
      this.showDeleteConfirmationDialog = true
      this.taskBeinDeleted = { ...task }
    },
    deleteTask() {
      // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/splice
      this.tasks.splice(
        this.tasks.indexOf(
          this.tasks.find((t) => t.id === this.taskBeinDeleted.id)
        ),
        1
      )
      // this.tasks.splice(this.taskBeinDeleted, 1)
      this.showDeleteConfirmationDialog = false
      this.snackBarMessage = 'Tasca eliminada correctament!'
      this.showSnackbar = true
    },
    // toggle(task) {
    //   console.log('TODO TOGGLE TASK')
    //   console.log(task)
    // },
  },
}

export default vue
</script>
