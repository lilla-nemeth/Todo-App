import { useState } from 'react';
import DownArrow from '../assets/icons/DownArrow';
import { generateId, changeColor } from '../utils/helperFunctions';
import * as colorTypes from '../types/priority';
import { DropdownProps } from '../types/types';

const priorityNames: { [index: string]: string } = {
	1: 'Not important',
	2: 'Important',
	3: 'Urgent',
};

const Dropdown = (props: DropdownProps) => {
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
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
					border: `2px solid ${changeColor(
						value,
						isCompleted,
						colorTypes.doneColor,
						colorTypes.notImportantColor,
						colorTypes.importantColor,
						colorTypes.urgentColor
					)}`,
					color: changeColor(
						value,
						isCompleted,
						colorTypes.doneColor,
						colorTypes.notImportantColor,
						colorTypes.importantColor,
						colorTypes.urgentColor
					),
				}}
			>
				{priorityNames[value]}{' '}
				<DownArrow
					style={
						isCompleted
							? { fill: '#ccc', strokeWidth: '3' }
							: {
									fill: changeColor(
										value,
										isCompleted,
										colorTypes.doneColor,
										colorTypes.notImportantColor,
										colorTypes.importantColor,
										colorTypes.urgentColor
									),
							  }
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
};

export default Dropdown;
