import { useState } from 'react';
import { ReactComponent as ArrowDown } from '../assets/icons/arrow_down.svg';
import { generateId, chooseColor } from '../utils/HelperFunctions';

const notImportantColor = 'rgb(255, 200, 200)';
const importantColor = 'rgb(255, 157, 157)';
const urgentColor = 'rgb(255, 103, 103)';
const doneColor = '#ccc';

const priorityNames = {
	1: 'Not important',
	2: 'Important',
	3: 'Urgent',
};

export default function Dropdown(props) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { value, isCompleted, onSelect } = props;

	return (
		<div
			className={isCompleted ? 'dropdownContainerInactive' : 'dropdownContainer'}
			onMouseLeave={() => setDropdownOpen(false)}
			onMouseEnter={() => setDropdownOpen(true)}
		>
			<div
				className='dropdownSelected'
				style={{
					border: `2px solid ${chooseColor(value, isCompleted, doneColor, notImportantColor, importantColor, urgentColor)}`,
					color: chooseColor(value, isCompleted, doneColor, notImportantColor, importantColor, urgentColor),
				}}
			>
				{priorityNames[value]}{' '}
				<ArrowDown
					style={
						isCompleted
							? { fill: '#ccc', strokeWidth: '3' }
							: { fill: chooseColor(value, isCompleted, doneColor, notImportantColor, importantColor, urgentColor) }
					}
				/>
			</div>
			{dropdownOpen && !isCompleted && (
				<div className='dropdownOptions'>
					{Object.entries(priorityNames).map((option) => {
						return (
							<div
								key={generateId(option[0])}
								id={generateId(option[0])}
								className='dropdownOption'
								onClick={() => {
									setDropdownOpen(false);
									onSelect(option[0]);
								}}
							>
								<div>{option[1]}</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
