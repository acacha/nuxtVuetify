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
              <v-switch :value="task.completed" @click="toggle(task)"></v-switch
            ></v-list-item-action>
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
        <v-toolbar-title qa="footer_title"
          >3 Tasques pendents per fer</v-toolbar-title
        >
      </v-toolbar>
      <!--    TODO Toolbar tingui botons accions per filtrar: All / Active / Completed -->
    </v-card>
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
    }
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
    },
    editTask(task) {
      this.editing = task.id

      // indexOf
      // this.tasks[index].title = sdasdadsa
      console.log('TODO EDIT TASK')
      console.log(task)
    },
    deleteTask(task) {
      // TODO
      // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/splice
      console.log('TODO DELETE TASK')
      console.log(task)
    },
    toggle(task) {
      console.log('TODO TOGGLE TASK')
      console.log(task)
    },
  },
}
</script>
