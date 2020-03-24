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
    
    this.setHeader(this.currentView.header);
    this.currentView.render();
  }
  setHeader(header) {
    document.getElementsByClassName('main__header')[0].textContent = header;
  }
}