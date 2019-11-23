const TASK_COUNT = 3;

import {createSiteMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createEditTemplate} from './components/task-edit.js';
import {createCardTemplate} from './components/task.js';
import {createLoadMoreTemplate} from './components/load-more-button.js';


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createEditTemplate(), `beforeend`);

const tasksElement = siteMainElement.querySelector(`.board__tasks`);


new Array(TASK_COUNT)
  .fill(``)
  .forEach(() => render(tasksElement, createCardTemplate(), `beforeend`));

render(boardElement, createLoadMoreTemplate(), `beforeend`);
