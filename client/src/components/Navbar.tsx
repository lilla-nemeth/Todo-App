import { NavbarProps } from '../types/types';

const Navbar = (props: NavbarProps) => {
	const { username, handleLogOut, setToken } = props;

	return (
		<div className='navbar'>
			<div className='navbarWelcomeBox'>
				<p>Hi {username}!</p>
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
