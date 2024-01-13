import React, { useState, useRef } from 'react';

const Bubble = ({ fill, date, time }) => {
	return (
		<svg version='1.1' fill={fill} xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 24 22'>
			<path d='M24,0H0v17h4v5l7-5h13V0z' />
			<text transform='matrix(1 0 0 1 1.6304 7.5122)' fill='#000' fontSize='4' textAnchor='center'>
				<tspan x='0' y='0'>
					{date}
				</tspan>
				<tspan x='5.2' y='6'>
					{time}
				</tspan>
			</text>
		</svg>
	);
};

function Tooltip(props) {
	const { date, time } = props;
	const [hover, setHover] = useState(false);
	const hoverTimeout = useRef;

	const handleMouseEnter = () => {
		hoverTimeout.current = setTimeout(() => {
			setHover(true);
		}, 200);
	};

	const handleMouseLeave = () => {
		if (hoverTimeout.current) {
			clearTimeout(hoverTimeout.current);
			hoverTimeout.current = null;
		}
		setHover(false);
	};

	return (
		<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			{hover && (
				<div className='bubbleContainer'>
					<div className='bubbleWrapper'>
						<Bubble fill={'rgb(114, 180, 140)'} date={date} time={time} />
					</div>
				</div>
			)}
			{props.children}
		</div>
	);
}
export default Tooltip;
