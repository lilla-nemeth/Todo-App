import { order } from '../components/ToDo';
import AscendingArrow from '../assets/icons/AscendingArrow';
import DescendingArrow from '../assets/icons/DescendingArrow';
import { SortingProps, TodoOrderNames } from '../types/types';

const SortingButtons = (props: SortingProps) => {
	const { orderBy, setOrderBy } = props;

	function createButtonText(
		currentState:
			| TodoOrderNames['newest']
			| TodoOrderNames['mostImportant']
			| TodoOrderNames['uncompleted']
			| TodoOrderNames['oldest']
			| TodoOrderNames['leastImportant']
			| TodoOrderNames['completed'],
		descending: TodoOrderNames['newest'] | TodoOrderNames['mostImportant'] | TodoOrderNames['uncompleted'],
		ascending: TodoOrderNames['oldest'] | TodoOrderNames['leastImportant'] | TodoOrderNames['completed'],
		passive: string
	) {
		if (currentState === descending) {
			return (
				<div className='sortingButtonArrow'>
					{descending}
					<DescendingArrow />
				</div>
			);
		} else if (currentState === ascending) {
			return (
				<div className='sortingButtonArrow'>
					{ascending}
					<AscendingArrow className={''} />
				</div>
			);
		} else {
			return (
				<div className='sortingButtonArrow'>
					{passive}
					<AscendingArrow className={'sortingButtonAscArrow'} />
				</div>
			);
		}
	}

	return (
		<div>
			<div className='sortingRow'>
				<button
					onClick={() => {
						if (orderBy === order.oldest) {
							setOrderBy(order.newest);
						} else {
							setOrderBy(order.oldest);
						}
					}}
					className={orderBy === order.newest || orderBy === order.oldest ? 'buttonDateActive' : 'buttonDate'}
				>
					{createButtonText(orderBy, order.newest, order.oldest, 'Date')}
				</button>
				<button
					onClick={() => {
						if (orderBy === order.mostImportant) {
							return setOrderBy(order.leastImportant);
						} else {
							return setOrderBy(order.mostImportant);
						}
					}}
					className={orderBy === order.leastImportant || orderBy === order.mostImportant ? 'buttonImportanceActive' : 'buttonImportance'}
				>
					{createButtonText(orderBy, order.mostImportant, order.leastImportant, 'Importance')}
				</button>
				<button
					onClick={() => {
						if (orderBy === order.uncompleted) {
							return setOrderBy(order.completed);
						} else {
							return setOrderBy(order.uncompleted);
						}
					}}
					className={orderBy === order.completed || orderBy === order.uncompleted ? 'buttonStatusActive' : 'buttonStatus'}
				>
					{createButtonText(orderBy, order.uncompleted, order.completed, 'Status')}
				</button>
			</div>
		</div>
	);
};

export default SortingButtons;
