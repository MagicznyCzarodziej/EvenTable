import View from './index.js';

export default class AddEventView extends View {
  constructor() {
    super({
      className: 'add-event',
      header: 'Dodaj wydarzenie',
    });

    this.categories = JSON.parse(window.localStorage.getItem('categories')) || [];
    this.events = JSON.parse(window.localStorage.getItem('events')) || [];
  }

  render() {
    let categories = '';

    for (const category of this.categories) {
      const html = `
        <div class="category" data-id=${category.id}>
          <div class="category__name">${category.name}</div>
          <div class="category__color">
            <input type="color" value="${category.color}">
          </div>
        </div>
      `;
      categories = categories.concat(html);
    }

    const html = `
      <div class="VIEW add-event">
      <form>
        <input type="datetime-local" name="datetime" class="add-event__datetime">
        <input type="text" class="add-event__title" placeholder="Nazwa wydarzenia">
        <div class="add-event__categories__label">Kategoria</div>
        <div class="add-event__categories">
          <div class="add-event__categories__list">
            ${categories}
          </div>
          <div class="add-event__categories__new category">
            <i data-feather="plus"></i>
            <div class="add-event__categories__new__name">
              <input type="text"
                id="add-event__categories__new__name__input"
                placeholder="Nowa kategoria..."
              >
            </div>
            <div class="add-event__categories__new__color">
              <input type="color" id="add-event__categories__new__color__input">
            </div>
          </div>
        </div>
        <input type="button" class="add-event__save" value="Zapisz">
      </form>
    </div>
    `;

    super.render(html);
    
    const categoriesBox = Dom.findByClass('add-event__categories__list')[0];
    categoriesBox.addEventListener('click', this.selectCategory);

    const addEventButton = Dom.findByClass('add-event__save')[0];
    addEventButton.addEventListener('click', (event) => {
        this.addEvent();
    });

    const newCategoryInput = Dom.findByClass('add-event__categories__new')[0];
    newCategoryInput.addEventListener('click', (event) => {
      Dom.id('add-event__categories__new__name__input').focus();
    });
    newCategoryInput.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        Dom.append(categoriesBox, this.generateNewCategory());
      }
    });
  }

  selectCategory(event) {
    const target = event.target.closest('.category');
    const categoryId = target.dataset['id'];
    if (!categoryId) return;
  
    const categoriesDivs = Dom.findByClass('category');
    for (const category of categoriesDivs) category.classList.remove('selected');
    target.classList.add('selected');
  }

  addEvent() {
    const datetime = Dom.findByClass('add-event__datetime')[0].value;
    const title = Dom.findByClass('add-event__title')[0].value;
    const categories = Array.from(Dom.findByClass('category'));
    const category = categories.find((category) => {
      return category.classList.contains('selected');
    });
    if(!category) return;
    const categoryId = parseInt(category.dataset.id);
    
    this.events.push({
      datetime,
      title,
      categoryId,
    });
    super.saveData();
    window.location.reload();
  }

  generateNewCategory() {
    const categoriesLength = this.categories.length;
    const id = categoriesLength ? this.categories[categoriesLength-1] : 0;
    const name = Dom.id('add-event__categories__new__name__input').value;
    const color = Dom.id('add-event__categories__new__color__input').value;
  
    this.categories.push({ id, name, color });

    const html = `
      <div class="category" data-id=${id}>
        <div class="category__name">${name}</div>
        <div class="category__color">
          <input type="color" value="${color}">
        </div>
      </div>
    `;
    return html;
  }
}

