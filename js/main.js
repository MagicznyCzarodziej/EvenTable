moment.locale('pl', {
    months: [
        'stycznia',
        'lutego',
        'marca',
        'kwietnia',
        'maja',
        'czerwca',
        'lipca',
        'sierpnia',
        'września',
        'października',
        'listopada',
        'grudnia'
    ],
});

window.onload = () => {
    const app = new App;
}

const views = {
    EVENTS: {
        className: 'events',
        header: 'Wszystkie wydarzenia',
    },
    ADD_EVENT: {
        className: 'add-event',
        header: 'Dodaj wydarzenie',
    },
    RULES: {
        className: 'rules',
        header: 'Regulamin',
    },
    ABOUT: {
        className: 'about',
        header: 'O nas',
    },
}


class App {
    currentView = views.ALL_EVENTS;
    header = document.getElementById('app__header');
    container = document.getElementById('app__container');
    categories = [];
    events = [];
    filter = '';

    constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        const view = urlParams.get('view') || 'EVENTS';
        this.filter = urlParams.get('filter');
        this.switchView(view);
        this.loadData();
        feather.replace({ class: 'icon', width: 20, height: 20, stroke: '#A2A2A2' });

        const addEventButton = Dom.findByClass('add-event__save')[0];
        addEventButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.addEvent();
        });
    }

    handleLink({ target }) {
        this.switchView(target.dataset.view);
    }

    switchView(view) {
        this.currentView = views[view];
        if (!this.filter) this.header.textContent = this.currentView.header;
        else if (this.filter == 'coming') this.header.textContent = 'Nadchodzące wydarzenia';
        else if (this.filter == 'missed') this.header.textContent = 'Minione wydarzenia';

        const viewsDivs = this.container.getElementsByClassName('VIEW');
        
        for (const view of viewsDivs) {
            if (view.classList.contains(this.currentView.className)) {
                view.classList.remove('VIEW__HIDDEN');
            } else view.classList.add('VIEW__HIDDEN');
        }
    }

    loadData() {
        this.categories = JSON.parse(window.localStorage.getItem('categories'));
        this.events = JSON.parse(window.localStorage.getItem('events')) || [];
        
        const eventsBox = Dom.findByClass(views.EVENTS.className)[0];

        this.events.sort((a, b) => {
            const timeA = moment(a.datetime)
            const timeB = moment(b.datetime)
            if (timeA.isBefore(timeB)) return -1;
            else return 1;
        })

        const now = moment();
        let filterdEvents;
        if (!this.filter) filterdEvents = this.events;
        else filterdEvents = this.events.filter((event) => {
            if (this.filter == 'coming') return !(moment(event.datetime).isBefore(now));
            if (this.filter == 'missed') return moment(event.datetime).isBefore(now);
        });
        
        for (const event of filterdEvents) {
            Dom.append(eventsBox, this.buildEventDom(event));
        }

        // Categories
        const categoriesBox = Dom.findByClass('add-event__categories__list')[0];

        for (const category of this.categories) {
            const categoryDom = `
                <div class="category" data-id=${category.id}>
                <div class="category__name">${category.name}</div>
                <div class="category__color">
                    <input type="color" name="color" value="${category.color}">
                    </div>
                </div>
            `;
            Dom.append(categoriesBox, categoryDom);
        }

        categoriesBox.addEventListener('click', selectCategory);
    }

    saveData() {
        window.localStorage.setItem('categories', JSON.stringify(this.categories));
        window.localStorage.setItem('events', JSON.stringify(this.events));
    }

    buildEventDom({ datetime, title, categoryId }) {
        const date = moment(datetime);
        const now = moment();
        const yesterday = moment().subtract(1, 'day');
        const tommorow = moment().add(1, 'day');

        let dateString;
        if (date.isSame(now, 'date')) dateString = 'Dzisiaj';
        else if (date.isSame(yesterday, 'date')) dateString = 'Wczoraj';
        else if (date.isSame(tommorow, 'date')) dateString = 'Jutro';
        else dateString = date.format('D MMMM');
        
        const timeString = date.format('HH:mm');
        
        const category = this.categories[categoryId];
    
        return `
            <div class="event">
                <div class="event__datetime">
                    <div class="event__date">${dateString}</div>
                    <div class="event__time">${timeString}</div>
                </div>
                <div class="event__title">
                    ${title}
                </div>
                <div class="event__category">
                    <div class="event__category__box" style="background-color: ${category.color};">
                        ${category.name}
                    </div>
                </div>
                <div class="event__delete">
                    <i data-feather="x"></i>
                </div>
            </div>
        `;
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
        this.saveData();
    }
}

function selectCategory(event) {
    const target = event.target.closest('.category');
    const categoryId = target.dataset['id'];
    if (!categoryId) return;

    const categoriesDivs = Dom.findByClass('category');
    for (const category of categoriesDivs) category.classList.remove('selected');
    target.classList.add('selected');
}