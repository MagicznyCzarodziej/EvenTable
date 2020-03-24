export default class View {
  constructor(options) {
    this.name = options.className;
    this.header = options.header;
  }
  render(html) {
    const container = Dom.id('app__container');
    Dom.html(container, html);
    feather.replace({ class: 'icon', width: 20, height: 20, stroke: '#A2A2A2' });
  }
  saveData() {
    window.localStorage.setItem('categories', JSON.stringify(this.categories));
    window.localStorage.setItem('events', JSON.stringify(this.events));
  }
}

