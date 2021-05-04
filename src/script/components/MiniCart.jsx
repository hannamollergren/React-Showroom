import React from 'react';
import '../../style/miniCart.scss';


const MiniCart = (props) => {

	let priceList = [];

	// Räknar ut cartens totala pris
	props.cartList.map((item) => {
		return priceList.push(item.price);
	})

	const totalPrice = priceList.reduce((total, price, index) => total + price, 0);
	//

	const closeMiniCart = () => {
		props.setDisplayMiniCart(false)
	}

	const deleteCartItem = () => {
		console.log('deleteCartItem')
	}

	return (
		<div className="mini-cart">
			<div className="container arrow-top">
				{props.cartCount <= 0 ? <p>Your cart is empty</p> :
				<>
				<button className="mini-cart__close-btn" onClick={() => closeMiniCart()}></button>
				<ul className="mini-cart__list-container">
				{props.cartList.map((cartItem, index) => 
					<div key={index} className="mini-cart__product-container">
						<div className="mini-cart__image" style={{
							backgroundImage: `url(${cartItem.images[0]})`,
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center'
						}}></div>
						<li className="mini-cart__product-info">
							<p className="mini-cart__brand"><span>{cartItem.brand}</span></p>
							<p className="mini-cart__name">{cartItem.name}</p>
							<p>Quantity: 1</p>
							<p>Size: {cartItem.size}</p>
							<p>Color: {cartItem.color}</p>
							<p className="mini-cart__price">{cartItem.price} kr</p>
						</li> 
						<button onClick={() => deleteCartItem()} className="mini-cart__delete-btn"></button>
					</div>
				)}
				</ul>
				</>
				}
				<div className="mini-cart__total-price">
					<p>Total</p>
					<p>{totalPrice} kr</p>
				</div>
				<a href="/checkout"><button className="mini-cart__checkout-btn" disabled={props.cartCount <= 0}>Checkout</button></a>
			</div>
		</div>
	)
}
export default MiniCart;

