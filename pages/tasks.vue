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
        <div v-for="task in tasks" :key="task.id">
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
                v-if="editing === task.id"
                v-model="newTask"
                autofocus
              ></v-text-field>
              <span v-else @dblclick="editTask(task)">{{ task.title }}</span>
            </v-list-item-title>
            <v-list-item-action>
              <v-btn color="success" icon @click="editTask(task)">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn color="error" icon @click="deleteTask(task)">
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

    <v-snackbar v-model="showSnackbar">
      Tasca afegida correctament!
    </v-snackbar>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Tasks',
  data() {
    return {
      editing: null,
      tasks: [],
      newTask: '',
      showSnackbar: false,
    }
  },
  computed: {
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
  methods: {
    addTask() {
      // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array
      // ARRAYS -> COLLECTIONS
      this.tasks.push({
        id: uuidv4(),
        title: this.newTask,
        completed: false,
      })
      this.newTask = ''
      this.showSnackbar = true
    },
    editTask(task) {
      this.editing = task.id

      // indexOf
      // this.tasks[index].title = sdasdadsa
      console.log('TODO EDIT TASK')
      console.log(task)
    },
    deleteTask(task) {
      // this.tasks.splice(
      //   this.tasks.indexOf(this.tasks.find((t) => t.id === task.id)),
      //   1
      // )
      this.tasks.splice(task, 1)

      // TODO
      // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/splice
      // console.log('TODO DELETE TASK')
      // console.log(task)
    },
    // toggle(task) {
    //   console.log('TODO TOGGLE TASK')
    //   console.log(task)
    // },
  },
}
</script>
