import Bubble from '../assets/icons/Bubble';
import { TooltipProps } from '../types/types';

const Tooltip = (props: TooltipProps) => {
	const { hover, date, time, onMouseEnter, onMouseLeave, calendar } = props;

	return (
		<div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
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
