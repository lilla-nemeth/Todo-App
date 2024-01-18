import { CheckboxInputProps } from '../../types/types';

const CheckboxInput = (props: CheckboxInputProps) => {
	const { labelClassName, htmlFor, id, type, name, checked, onChange, checkmarkClassName } = props;
	return (
		<>
			<label className={labelClassName} htmlFor={htmlFor}>
				<input id={id} type={type} name={name} checked={checked} onChange={onChange} />
				<span className={checkmarkClassName}></span>
			</label>
		</>
	);
};

export default CheckboxInput;
