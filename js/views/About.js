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
       <div class="about__text">
        Super aplikacji do zapisywania wydarzeń. Nie ma tu nic ciekawego do napisania. Zobaczcie stockowe zdjęcia ludzi, które pobrałem z internetu:
       </div>
        <div class="about__images">
          <img src="../../assets/person1.jpeg">
          <img src="../../assets/person2.jpeg">
          <img src="../../assets/person3.jpeg">
        </div>
        <div class="about__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.2892644966296!2d-118.27140828457972!3d34.03645028061027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7c5c4c61f79%3A0xa8b0ee34c4b3c5c5!2sFlower%20St%2C%20Los%20Angeles%2C%20CA%2C%20Stany%20Zjednoczone!5e0!3m2!1spl!2spl!4v1588072583379!5m2!1spl!2spl"
            frameborder="0"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          >
            Tu powinna być mapka, ale twoja przeglądarka nie zezwala na używanie iframe :(
          </iframe>
        </div>
        <div class="about__footer">
          Eventable &copy 2020
        </div>
      </div>
    `);
  }
}