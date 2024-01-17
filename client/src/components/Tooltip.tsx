import { useRef } from 'react';
import Bubble from '../assets/icons/Bubble';
import { TooltipProps } from '../types/types';

const Tooltip = (props: TooltipProps) => {
	const { hover, setHover, date, time, calendar } = props;
	const hoverTimeOut = useRef<number | any>(null);

	const handleMouseEnter = () => {
		hoverTimeOut.current = setTimeout(() => {
			setHover(true);
		}, 200);
	};

	const handleMouseLeave = () => {
		if (hoverTimeOut.current) {
			clearTimeout(hoverTimeOut.current);
			hoverTimeOut.current = null;
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
			{calendar}
		</div>
	);
};

export default Tooltip;
