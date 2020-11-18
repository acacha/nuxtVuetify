<template>
  <app-tasks :tasks="tasks"></app-tasks>
</template>

<script>
import { mapGetters } from 'vuex'
import AppTasks from '../components/AppTasks'

export default {
  name: 'Tasks',
  components: {
    'app-tasks': AppTasks,
  },
  computed: {
    ...mapGetters({
      tasks: 'tasks/list',
    }),
  },
}
</script>
