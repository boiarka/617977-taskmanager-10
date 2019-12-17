import TaskEditComponent from '../components/task-edit.js';
import TaskComponent from '../components/task.js';
import LoadMoreComponent from '../components/load-more-button.js';
import BoardTasks from '../components/board-tasks.js';

import {
  render,
  remove,
  replace,
  RenderPosition
} from '../utils/render.js';


const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  taskComponent.setEditButtonClickHandler(() => {
    replace(taskEditComponent, taskComponent);
  });

  taskEditComponent.setSubmitHandler(() => {
    replace(taskComponent, taskEditComponent);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};


export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasksComponent = new TaskComponent();
    this._loadMoreButtonComponent = new LoadMoreComponent();
    this._boadTasksComponent = new BoardTasks();
  }
  render(tasks) {
    const container = this._container.getElement();
    render(container, this._boadTasksComponent, RenderPosition.BEFOREEND);

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    const taskListElement = this._boadTasksComponent.getElement();

    tasks.slice(0, showingTasksCount).forEach((task) => {
      renderTask(taskListElement, task);
    });

    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount)
        .forEach((task) => renderTask(taskListElement, task));

      if (showingTasksCount >= tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
