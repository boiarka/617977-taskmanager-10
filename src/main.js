const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

import SiteMenuComponent from "./components/menu.js";
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import TaskEditComponent from './components/task-edit.js';
import TaskComponent from './components/task.js';
import LoadMoreComponent from './components/load-more-button.js';
import BoardTasks from './components/board-tasks.js';

import {
  generateTasks
} from './mocks/task.js';
import {
  generateFilters
} from './mocks/filter.js';

import {
  render,
  RenderPosition
} from "./utils.js";


const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters).getElement(), `beforeend`);
render(siteMainElement, new BoardComponent().getElement(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, new BoardTasks().getElement(), `beforeend`);
const tasksElement = siteMainElement.querySelector(`.board__tasks`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;


const renderTask = (task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    tasksElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    tasksElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  render(tasksElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

tasks.slice(0, showingTasksCount).forEach((task) => {
  renderTask(task);
});

render(boardElement, new LoadMoreComponent().getElement(), `beforeend`);

const loadMoreButton = boardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(tasksElement, new TaskComponent(task).getElement(), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
