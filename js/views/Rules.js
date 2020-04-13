import View from './index.js';

export default class RulesView extends View {
  constructor() {
    super({
      className: 'rules',
      header: 'Regulamin',
    });
  }
  render() {
    super.render(`
      <div class="VIEW rules">
        <ol>
          <li>Jedz śniadania bo smaczne są i zdrowe.</li>
          <li>Don't even blink.</li>
          <li>Pogłaskaj każdego spotkanego kota.</li>
          <li>Zapinaj pasy.</li>
          <li value="32">Enjoy the little things.</li>
        </ol>
      </div>
    `);
  }
}