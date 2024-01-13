const Bubble = (props: any) => {
	const { backgroundColor, textColor, fontSize, date, time } = props;

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

export default Bubble;
