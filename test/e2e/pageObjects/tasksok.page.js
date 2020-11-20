// https://webdriver.io/docs/pageobjects.html
class Page {
  open(path = '/tasksok') {
    // eslint-disable-next-line no-undef
    browser.url(path)
  }

  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/get
  get itemInput() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem afegint més d'un input type text?
    // eslint-disable-next-line no-undef
    return $('input[type=text]')
    // return $('[qa="input_text_new_task"]')
  }

  get itemEditInput() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem afegint més d'un input type text?
    // eslint-disable-next-line no-undef
    return $('input[type=text]')
  }

  get footerTitle() {
    // eslint-disable-next-line no-undef
    return $('[qa="footer_title"]')
  }

  get filterAll() {
    // eslint-disable-next-line no-undef
    return $('[qa="filter_all"]')
  }

  get filterCompleted() {
    // eslint-disable-next-line no-undef
    return $('[qa="filter_completed"]')
  }

  get filterPending() {
    // eslint-disable-next-line no-undef
    return $('[qa="filter_pending"]')
  }

  filterByPending() {
    this.filterPending.click()
  }

  filterByCompleted() {
    this.filterCompleted.click()
  }

  filterByAll() {
    this.filterAll.click()
  }

  get itemSubmit() {
    // eslint-disable-next-line no-undef
    return $('[qa="add-task-submit-button"]')
  }

  get list() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem canviant el nom de la classe?
    // eslint-disable-next-line no-undef
    return $('[qa="tasks_list"]')
  }

  get listItems() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem canviant el nom de la classe?
    // eslint-disable-next-line no-undef
    return $$('[qa="tasks_list_item"]')
  }

  get listItemTitles() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem canviant el nom de la classe?
    // eslint-disable-next-line no-undef
    return $$('[qa="tasks_list_item_title"]')
  }

  get deleteButtons() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem canviant el nom de la classe?
    // eslint-disable-next-line no-undef
    return $$('[qa="tasks_list_item_delete_button"]')
  }

  get editButtons() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem canviant el nom de la classe?
    // eslint-disable-next-line no-undef
    return $$('[qa="tasks_list_item_edit_button"]')
  }

  get flash() {
    // eslint-disable-next-line no-undef
    return $('[qa="flash_message"]')
  }

  get listItemsToggles() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem canviant el nom de la classe?
    // eslint-disable-next-line no-undef
    return $$('[qa="tasks_list_item_toogle"]')
  }

  get listSize() {
    return this.listItems.length
  }

  addListItem(item) {
    this.itemInput.setValue(`${item}\n`) // OBSERVEU es fa un enter al camp
  }

  addListItemWithClick(item) {
    this.itemInput.setValue(`${item}`)
    this.itemSubmit.click()
  }

  isItemCompletedAt(position) {
    return this.listItemTitles[position]
      .getAttribute('class')
      .includes('completed')
  }

  toogleItemAt(position) {
    this.listItemsToggles[position].click()
  }

  editItemAt(position, newValue) {
    this.editButtons[position].click()
    this.itemEditInput.setValue(`${newValue}\n`)
  }

  deleteItemAt(position) {
    this.deleteButtons[position].click()
  }

  addListItems(items) {
    items.map((item) => {
      this.addListItem(item)
    })
  }

  addListItemsByClick(items) {
    items.map((item) => {
      this.addListItemWithClick(item)
    })
  }
}

module.exports = new Page()
