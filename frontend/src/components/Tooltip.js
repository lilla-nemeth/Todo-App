import React, { useState, useRef } from 'react';

const Bubble = ({ backgroundColor, textColor, fontSize, date, time }) => {
	return (
		<svg version='1.1' fill={backgroundColor} xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 24 22'>
			<path d='M24,0H0v17h4v5l7-5h13V0z' />
			<text transform='matrix(1 0 0 1 1.6304 7.5122)' fill={textColor} fontSize={fontSize} textAnchor='center'>
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
	const { hover, setHover, hoverTimeout, date, time } = props;

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
						<Bubble backgroundColor={'var(--clr-darkgreen)'} textColor={'var(--clr-white)'} fontSize={'4'} date={date} time={time} />
					</div>
				</div>
			)}
			{props.children}
		</div>
	);
}
export default Tooltip;
