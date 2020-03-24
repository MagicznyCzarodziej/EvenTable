import View from './index.js';

export default class Error404View extends View {
  constructor() {
    super({
      className: 'error404',
      header: 'Błąd',
    });
  }
  render() {
    super.render(`
      <div class="error404">Ups! Nie znaleziono szukanej podstrony :(</div>
    `);
  }
}