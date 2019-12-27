import SiteMenuComponent from "./components/menu.js";
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';


import {
  render,
  RenderPosition
} from './utils/render.js';
import {
  generateTasks
} from './mocks/task.js';
import {
  generateFilters
} from './mocks/filter.js';

const TASK_COUNT = 22;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);

const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);

const boardController = new BoardController(boardComponent);

boardController.render(tasks);
