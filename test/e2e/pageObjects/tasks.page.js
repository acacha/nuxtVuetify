// https://webdriver.io/docs/pageobjects.html
class Page {
  // CSS SELECTORS
  // https://ghostinspector.com/blog/css-selector-strategies-automated-browser-testing/

  // PER ID:
  // <input id="email" value=""> => #email  => PROBLEMA => Name col·lisión: és fàcil acabin haven més de dos ids iguals a la pàgina al juntar components

  // Per attributes
  // <input name="email" value=""> => [name="email"]

  // Exemples que són iguals => [id="identifier-here"] === #identifier-here

  // Mirar si existeix un link a /docs => [href="/docs/"]

  // CLASS NAME:
  // <div class="some-class another-class">...</div> => .class-name === [class*="class-name"]

  // TODO. Exercici pels alumnes
  // Atributs dedicats a testing a les plantilles
  // [data-testing="id-here"] or [qa="id-here"] => Qa és de Quality Assurance

  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/get
  get itemInput() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem afegint més d'un input type text?
    // eslint-disable-next-line no-undef
    return $('input[type=text]')
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
    return $('[qa="add-todo-submit-button"]')
  }

  get list() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem canviant el nom de la classe?
    // eslint-disable-next-line no-undef
    return $('.todolist')
  }

  get listItems() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem canviant el nom de la classe?
    // eslint-disable-next-line no-undef
    return $$('.todolist__item')
  }

  get deleteButtons() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem canviant el nom de la classe?
    // eslint-disable-next-line no-undef
    return $$('.todolist__item-deleteBtn')
  }

  get editButtons() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem canviant el nom de la classe?
    // eslint-disable-next-line no-undef
    return $$('.todolist__item-editBtn')
  }

  get flash() {
    // eslint-disable-next-line no-undef
    return $('[qa="flash_message"]')
  }

  get listItemsToggles() {
    // TODO: Part fràgil del test -> CSS selectors: Que passa si acabem canviant el nom de la classe?
    // eslint-disable-next-line no-undef
    return $$('.todolist__item-toggle')
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
    return this.listItems[position].getAttribute('class').includes('completed')
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

  open(path = '/tasks') {
    // eslint-disable-next-line no-undef
    browser.url(path)
  }
}

module.exports = new Page()
