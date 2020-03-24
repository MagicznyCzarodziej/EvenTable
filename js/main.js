import ViewManager from './ViewManager.js';
import EventsView from './views/Events.js';
import AddEventView from './views/AddEvent.js';
import RulesView from './views/Rules.js';
import AboutView from './views/About.js';

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
  const viewManager = new ViewManager([
    new EventsView(),
    new AddEventView(),
    new RulesView(),
    new AboutView(),
  ]);
}