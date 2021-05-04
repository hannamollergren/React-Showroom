import React from 'react'
import Input from './Input';
import '../../style/login.scss';
import { useDispatch } from 'react-redux';
import { isAuthenticated } from '../actions';

const Login = () => {

	const dispatch = useDispatch();

	return (
		<div className="login">
			<div className="login__container">
				<Input label="Username" type="text"/>
				<Input label="Password" type="password"/>
				<a href="/home"><button className="login__login-button"	onClick={() => dispatch(isAuthenticated())}>Login</button></a>
				<a href="/home"><button className="login__createAccount-button">Create Account</button></a>
			</div>
		</div>
	)
}
export default Login;
