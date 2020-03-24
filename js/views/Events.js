import View from './index.js';

export default class EventsView extends View {
  filter = '';
  constructor() {
    super({
      className: 'events',
      header: 'Wszystkie wydarzenia',
    })

    const urlParams = new URLSearchParams(window.location.search);
    this.filter = urlParams.get('filter');

    this.categories = JSON.parse(window.localStorage.getItem('categories'));
    this.events = JSON.parse(window.localStorage.getItem('events')) || [];

    this.events.sort((a, b) => {
      const timeA = moment(a.datetime)
      const timeB = moment(b.datetime)
      if (timeA.isBefore(timeB)) return -1;
      else return 1;
    })

    if (this.filter) this.events = this.filterEvents(this.events, this.filter);
  }

  render() {
    if (this.filter == 'coming') this.manager.setHeader('Nadchodzące wydarzenia');
    else if (this.filter == 'missed') this.manager.setHeader('Minione wydarzenia');

    let eventsHtml = '';

    for (let event of this.events) {
      eventsHtml = eventsHtml.concat(this.buildEventDom(event));
    }

    const html = `
      <div class="VIEW events">
        <div class="events__header" ${eventsHtml ? '' : 'style="display: none;"'}>
          <div class="events__header__date">Data</div>
          <div class="events__header__title">Tytuł</div>
          <div class="events__header__category">Kategoria</div>
        </div>
        ${eventsHtml ? eventsHtml : '<div class="events__no-events">Nie masz żadnych wydarzeń</div>'}
      </div>
    `;
    
    super.render(html);
  }

  filterEvents(events, filter) {
    const now = moment();
    return events.filter((event) => {
      if (filter == 'coming') return !(moment(event.datetime).isBefore(now));
      if (filter == 'missed') return moment(event.datetime).isBefore(now);
    });
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

    const category = this.categories.find((category) => {
      return category.id === categoryId;
    });

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