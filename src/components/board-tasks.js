import AbstractComponent from './abstract-component.js';

const createBoardTasksTemplate = () => (
  `<div class="board__tasks"></div>`
);

export default class BoardTasks extends AbstractComponent {
  getTemplate() {
    return createBoardTasksTemplate();
  }
}
