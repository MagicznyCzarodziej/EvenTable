import Error404View from './views/Error404.js';

export default class ViewManager {
  views = [];
  constructor(views) {
    views.forEach((view) => {
      view.manager = this;
    });
    this.views = views;
    const urlParams = new URLSearchParams(window.location.search);
    const viewName = urlParams.get('view') || 'events';
    this.switchView(viewName)
  }
  switchView(viewName) {
    this.currentView = this.views.find((view) => {
      return view.name === viewName;
    });
    
    if (!this.currentView) this.currentView = new Error404View();

    this.setHeader(this.currentView.header);
    this.currentView.render();
  }
  setHeader(header) {
    document.getElementsByClassName('main__header')[0].textContent = header;
  }
}