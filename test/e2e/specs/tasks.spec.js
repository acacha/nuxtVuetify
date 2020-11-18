const TasksPage = require('../pageObjects/tasks.page')

const sampleItems = ['Comprar pa', 'Comprar llet', 'Fer les pràctiques de Tur']

// const sampleItemsObject = [
//   {
//     id: 1,
//     title: 'Comprar pa',
//     completed: false,
//   },
//   {
//     id: 2,
//     title: 'Comprar llet',
//     completed: false,
//   },
//   {
//     id: 3,
//     title: 'Fer les pràctiques de Tur',
//     completed: false,
//   },
// ]

describe('Tasks tests', () => {
  it('should open correct app', () => {

  it('should add items to the list correctly using enter', () => {
    TasksPage.open()
    TasksPage.addListItems(sampleItems)
    expect(TasksPage.listSize).toEqual(3)
    expect(TasksPage.footerTitle).toHaveText('3 Tasques pendents de fer')
  })

  it('shows flash message when user task is added', () => {
    TasksPage.open()
    TasksPage.addListItem('Comprar pa')
    expect(TasksPage.listSize).toEqual(1)
    expect(TasksPage.flash).toHaveText('Tasca afegida correctament!')
    expect(TasksPage.list).toHaveText('Comprar pa')
  })

  it('should add items to the list correctly clicking on submit button', () => {
    TasksPage.open()
    TasksPage.addListItemsByClick(sampleItems)
    expect(TasksPage.listSize).toEqual(3)
  })

  it('should toogle complete items correctly', () => {
    TasksPage.open()
    TasksPage.addListItems(sampleItems)
    expect(TasksPage.footerTitle).toHaveText('3 Tasques pendents de fer')
    expect(TasksPage.isItemCompletedAt(2)).toBeFalsy()
    TasksPage.toogleItemAt(2)
    expect(TasksPage.footerTitle).toHaveText('2 Tasques pendents de fer')
    expect(TasksPage.isItemCompletedAt(2)).toBeTruthy()
    TasksPage.toogleItemAt(2)
    expect(TasksPage.footerTitle).toHaveText('3 Tasques pendents de fer')
    expect(TasksPage.isItemCompletedAt(2)).toBeFalsy()
    TasksPage.toogleItemAt(2)
    TasksPage.toogleItemAt(1)
    expect(TasksPage.footerTitle).toHaveText('1 Tasca pendent de fer')
    TasksPage.toogleItemAt(0)
    expect(TasksPage.footerTitle).toHaveText(
      'Enhorabona! No tens cap tasca pendent de fer'
    )
  })

  it('can_delete_a_task', () => {
    TasksPage.open()
    TasksPage.addListItem('Comprar pa')

    TasksPage.deleteItemAt(0)

    expect(TasksPage.flash).toHaveText('Tasca eliminada correctament!')
    expect(TasksPage.list).not.toHaveText('Comprar pa')
  })

  it('can_edit_a_task', () => {
    TasksPage.open()
    TasksPage.addListItem('Comprar pa')

    TasksPage.editItemAt(0, 'Comprar llet')

    expect(TasksPage.flash).toHaveText('Tasca modificada correctament!')
    expect(TasksPage.list).not.toHaveText('Comprar pa')
    expect(TasksPage.list).toHaveText('Comprar llet')
  })

  it('can_filter_tasks_by_completed_and_pending_and_all', () => {
    TasksPage.open()
    TasksPage.addListItems(sampleItems)
    TasksPage.toogleItemAt(2)

    expect(TasksPage.list).toHaveText(sampleItems[0])
    expect(TasksPage.list).toHaveText(sampleItems[1])
    expect(TasksPage.list).toHaveText(sampleItems[2])
    expect(TasksPage.list).expect(TasksPage.listSize).toEqual(3)

    TasksPage.filterByCompleted()
    expect(TasksPage.listSize).toEqual(1)
    expect(TasksPage.list).not.toHaveText(sampleItems[0])
    expect(TasksPage.list).not.toHaveText(sampleItems[1])
    expect(TasksPage.list).toHaveText(sampleItems[2])

    TasksPage.filterByPending()
    expect(TasksPage.listSize).toEqual(2)
    expect(TasksPage.list).toHaveText(sampleItems[0])
    expect(TasksPage.list).toHaveText(sampleItems[1])
    expect(TasksPage.list).not.toHaveText(sampleItems[2])

    TasksPage.filterByAll()
    expect(TasksPage.listSize).toEqual(3)
    expect(TasksPage.list).toHaveText(sampleItems[0])
    expect(TasksPage.list).toHaveText(sampleItems[1])
    expect(TasksPage.list).toHaveText(sampleItems[2])
  })
})
