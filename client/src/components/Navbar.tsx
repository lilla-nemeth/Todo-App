const Navbar = (props: any) => {
	const { user, handleLogOut, setToken } = props;

	return (
		<div className='navbar'>
			<div className='navbarWelcomeBox'>
				<p>Hi {user}!</p>
			</div>
			<div className='navbarTodoBox'>
				<h3>Todo</h3>
			</div>
			<div className='navbarLogOutBox'>
				<button className='buttonLogOut' onClick={() => handleLogOut(setToken)}>
					Log out
				</button>
			</div>
		</div>
	);
};

export default Navbar;
