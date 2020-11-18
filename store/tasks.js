import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  list: [
    {
      id: uuidv4(),
      title: 'Comprar pa',
      completed: false,
    },
    {
      id: uuidv4(),
      title: 'Comprar llet',
      completed: false,
    },
    {
      id: uuidv4(),
      title: 'Fer pràctiques de Tur',
      completed: false,
    },
  ],
})

export const mutations = {
  add(state, title) {
    state.list.push({
      id: uuidv4(),
      title,
      completed: false,
    })
  },
  remove(state, task) {
    state.list.splice(
      state.list.indexOf(state.list.find((t) => t.id === task.id)),
      1
    )
  },
  toggle(state, task) {
    const t = state.list.find((t) => t.id === task.id)
    const index = state.list.indexOf(t)
    t.completed = !t.completed
    state.list[index] = t
  },
  edit(state, { task, title }) {
    const t = state.list.find((t) => t.id === task.id)
    const index = state.list.indexOf(t)
    t.title = title
    state.list[index] = t
  },
}

export const getters = {
  list(state) {
    return state.list
  },
}
