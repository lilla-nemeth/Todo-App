import { ButtonProps } from '../../types/types';

const Button = (props: ButtonProps) => {
	const { type, className, disabled, buttonContent, onClick } = props;
	return (
		<>
			<button type={type} className={className} disabled={disabled} onClick={onClick}>
				{buttonContent}
			</button>
		</>
	);
};

export default Button;
