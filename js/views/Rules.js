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
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis nostrum
      quasi ipsam, sequi fugit aspernatur quaerat ab id in laboriosam. Aperiam 
      quibusdam ullam fuga atque numquam nostrum nemo similique sunt!
    `);
  }
}