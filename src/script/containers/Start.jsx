import React, {useEffect, useState} from 'react';
import Welcome from '../components/Welcome';
import Login from '../components/Login';
import '../../style/start.scss';


const Start = (props) => {
	const [displayLogin, setDisplayLogin] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setDisplayLogin(true);
		 }, 3000);
	   },[]);

	return (
		<div className="start">
			{!displayLogin ? <Welcome/> : <Login isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setIsLoggedIn}/>}
		</div>
	)
}
export default Start;