import AbstractComponent from './abstract-component.js';

const createBoardTemplate = () => (
  `<section class="board container">
	<div class="board__filter-list">
		<a href="#" class="board__filter">SORT BY DEFAULT</a>
		<a href="#" class="board__filter">SORT BY DATE up</a>
		<a href="#" class="board__filter">SORT BY DATE down</a>
	</div>
</section>`
);


export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
