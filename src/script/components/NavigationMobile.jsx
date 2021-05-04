import React, {useState} from 'react';
import MiniCart from './MiniCart';
import { useSelector } from 'react-redux';
import Search from './Search';

const NavigationMobile = () => {

	const [displayMiniCart, setDisplayMiniCart] = useState(false);
	const [displaySearch, setDisplaySearch] = useState(false);
	
	let cartList = useSelector(state => state.cart);
	let cartCount = cartList.length;
	
	const showMiniCart = () => {
		setDisplayMiniCart(true);
	}

	const closeMiniCart = () => {
		if (displayMiniCart === true) {
			setDisplayMiniCart(false)
		} 
	}

	const handleSearch = () => {
		console.log()
		setDisplaySearch(!displaySearch)
	}

	return (
		<div className="navigation navigation__mobile">
			{displaySearch ? <Search displaySearch={displaySearch} /> : null}
			{displayMiniCart ? <MiniCart cartCount={cartCount} cartList={cartList} setDisplayMiniCart={setDisplayMiniCart}/> : null}
			<div className="navigation__links--mobile">
				<p onClick={() => handleSearch()} className="navigation__item navigation__item--icon-search"></p>
				<a href="/favorites" className="navigation__item navigation__item--icon-favorites"></a>
				<a href="/mypages" className="navigation__item navigation__item--icon-mypages"></a>
				<p onClick={() => {showMiniCart(); closeMiniCart()}} className="navigation__item navigation__item--icon-cart"></p>
			</div>
		</div>
	)
}
export default NavigationMobile;
