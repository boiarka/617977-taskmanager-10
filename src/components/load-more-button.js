import AbstractComponent from './abstract-component.js';

const createLoadMoreTemplate = () => (
  `<button class="load-more" type="button">load more</button>`
);

export default class LoadMore extends AbstractComponent {
  getTemplate() {
    return createLoadMoreTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
