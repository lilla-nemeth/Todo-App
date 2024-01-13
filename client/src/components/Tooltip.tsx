import Bubble from '../assets/icons/Bubble';

const Tooltip = (props: any) => {
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
};

export default Tooltip;
