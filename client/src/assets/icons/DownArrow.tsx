const DownArrow = (props: any) => {
	const { style } = props;
	return (
		<>
			<svg style={style} width='24' height='24' xmlns='http://www.w3.org/2000/svg' fillRule='evenodd' clipRule='evenodd'>
				<path d='M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z' />
			</svg>
		</>
	);
};

export default DownArrow;
