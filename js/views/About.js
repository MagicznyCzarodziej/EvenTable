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
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo aliquid commodi 
      deserunt architecto autem porro. Dolorem doloremque, id at recusandae 
      reiciendis, sint est ducimus libero sit officiis consequuntur, qui maxime.
    `);
  }
}