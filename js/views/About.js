import View from './index.js';

export default class AboutView extends View {
  constructor() {
    super({
      className: 'about',
      header: 'O nas',
    });
  }
  render() {
    super.render(`
      <div class="VIEW about">
        Tutaj będą jakieś animacje i inne cuda
      </div>
    `);
  }
}