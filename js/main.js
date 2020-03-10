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
    ALL_EVENTS: 'Wszystkie wydarzenia',
    COMING_EVENTS: 'Nadchodzące wydarzenia',
    MISSED_EVENTS: 'Minione wydarzenia',
    ADD_EVENT: 'Dodaj wydarzenie',
    RULES: 'Regulamin',
    ABOUT: 'O nas',
}


class App {
    currentView = views.ALL_EVENTS;
    header = document.getElementById('app__header');
    container = document.getElementById('app__container');
    categories = [];
    events = [];

    constructor() {
        this.createListeners();
        this.loadData();
        feather.replace({ class: 'icon', width: 20, height: 20, stroke: '#A2A2A2' });
    }

    handleLink({ target }) {
        this.switchView(target.dataset.view);
    }

    switchView(view) {
        this.currentView = view;
        this.header.textContent = views[this.currentView];

        const viewsDivs = this.container.getElementsByClassName('VIEW');
        
        for (const view of viewsDivs) {
            if (view.classList.contains(this.currentView)) view.classList.remove('VIEW__HIDDEN');
            else view.classList.add('VIEW__HIDDEN');
        }
    }

    loadData() {
        this.categories = JSON.parse(window.localStorage.getItem('categories'));
        this.events = JSON.parse(window.localStorage.getItem('events'));
        
        const eventsBox = Dom.findByClass('ALL_EVENTS')[0];

        this.events.sort((a, b) => {
            const timeA = moment(a.datetime)
            const timeB = moment(b.datetime)
            if (timeA.isBefore(timeB)) return -1;
            else return 1;
        })

        for (const event of this.events) {
            Dom.append(eventsBox, this.buildEventDom(event));
        }
    }

    saveData() {
        window.localStorage.setItem('categories', JSON.stringify(this.categories));
        window.localStorage.setItem('events', JSON.stringify(this.events));
    }

    createListeners() {
        const sidebarLinks = document.getElementsByClassName('sidebar__link');
        for (const link of sidebarLinks) {
            link.addEventListener('click', this.handleLink.bind(this));
        }
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
}