import React, { useState } from 'react';
import Hero from './Hero';
import '../../style/checkout.scss';
import { useSelector } from 'react-redux';
import Input from './Input';
import Confirmation from './Confirmation';
import { getCart } from '../actions';
import { useDispatch } from 'react-redux';

const Checkout = () => {

	const dispatch = useDispatch();

	let cartList = useSelector(state => state.cart);
	let priceList = [];
	let orderList = [...cartList];

	const [displayConfirmationPage, setDisplayConfirmationPage] = useState(false);
	const [order, setOrder] = useState();

	// Räknar ut cartens totala pris
	cartList.map((item) => {
		return priceList.push(item.price);
	})

	const totalPrice = priceList.reduce((total, price, index) => total + price, 0);
	//

	async function handleConfirmation() {
		setOrder(orderList)
		setDisplayConfirmationPage(true)
		dispatch(getCart([]));

		// TÖM CART
		try {
			const response = await fetch('/api/deletecart', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
				body: JSON.stringify()
			})
			const text = await response.text();
			JSON.parse(text); 

		} catch (error) {
			console.log('Something went wrong when adding to cart: ', error)
		}	
	}

	return (
		<>
			{!displayConfirmationPage ?  
			<div className="checkout">
				<Hero cssClassHero='checkout__hero-block' cssClassImage='checkout__hero-block-image' cssClassButton='' link='' label='' h1='Checkout' h2='Dreams come true'/>
				
				<main className="row">
				{cartList.length <= 0 ? <h3 className="columns large-6">Your cart is empty</h3> :
				<>
					<div className="columns small-12 medium-6 large-6 checkout__cart-items">
						<ul>
						{cartList.map((cartItem, index) => 
							<div key={index} className="checkout__product-container">
								<div className="checkout__image" style={{
									backgroundImage: `url(${cartItem.images[0]})`,
									backgroundSize: 'cover',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center'
								}}></div>
								<li className="checkout__product-info">
									<p className="checkout__brand"><span>{cartItem.brand}</span></p>
									<p className="checkout__name">{cartItem.name}</p>
									<p>Quantity: 1</p>
									<p>Size: {cartItem.size}</p>
									<p>Color: {cartItem.color}</p>
									<p className="checkout__price">{cartItem.price} kr</p>
								</li> 
							</div>
						)}
						</ul>
					</div>
					<div className="columns small-12 medium-6 large-6 checkout__customer-info">
						<h3 className="checkout__step"><span>Step 1 </span>- Customer information</h3>
						<Input label="First name" type="text" defaultValue="Hanna"/>
						<Input label="Last name" type="text" defaultValue="Möllergren"/>
						<Input label="Address" type="text" defaultValue="Test street 12"/>
						<Input label="Zip code" type="text" defaultValue="411 16"/>
						<Input label="City" type="text" defaultValue="Gothenburg"/>
						<Input label="Phone number" type="text" defaultValue="+46700 00 00 00"/>
						<Input label="Email" type="text" defaultValue="hanna@test.com"/>
						<h3 className="checkout__step"><span>Step 2 </span> - Delivery methods</h3>
						<div className="checkout__input-options">
							<div>
								<input type="radio" name="delivery"></input>
								<label>Standard delivery</label>
							</div>
							<p>19 kr</p>
						</div>
						<div className="checkout__input-options">
							<div>
								<input type="radio" name="delivery" defaultChecked></input>
								<label>Express delivery</label>
							</div>
							<p>39 kr</p>
						</div>
						<h3 className="checkout__step"><span>Step 3 </span> - Payment methods</h3>
						<div className="checkout__input-options">
							<div>
								<input type="radio" name="payment" defaultChecked></input>
								<label>Klarna faktura</label>
							</div>
						</div>
						<div className="checkout__input-options">
							<div>
								<input type="radio" name="payment"></input>
								<label>Credit card</label>
							</div>
						</div>
						<h3 className="checkout__step"><span>Step 4 </span> - Pick showroom</h3>
						<div className="checkout__input-options">
							<div>
								<input type="radio" name="showroom"></input>
								<label>Malmö</label>
							</div>
						</div>
						<div className="checkout__input-options">
							<div>
								<input type="radio" name="showroom"></input>
								<label>Helsingborg</label>
							</div>
						</div>
						<div className="checkout__input-options">
							<div>
								<input type="radio" name="showroom"></input>
								<label>Halmstad</label>
							</div>
						</div>
						<div className="checkout__input-options">
							<div>
								<input type="radio" name="showroom"></input>
								<label>Karlstad</label>
							</div>
						</div>
						<div className="checkout__input-options">
							<div>
								<input type="radio" name="showroom"></input>
								<label>Jönköping</label>
							</div>
						</div>
						<div className="checkout__input-options">
							<div>
								<input type="radio" name="showroom" defaultChecked></input>
								<label>Kalmar</label>
							</div>
						</div>
						<div className="checkout__input-options">
							<div>
								<input type="radio" name="showroom"></input>
								<label>Norrköping</label>
							</div>
						</div>
						<div className="checkout__input-options">
							<div>
								<input type="radio" name="showroom"></input>
								<label>Sundsvall</label>
							</div>
						</div>
					</div>
					<div className="columns small-12 large-12">
						<div className="checkout__total-price">
							<h4>Total</h4>
							<h4>{totalPrice} kr</h4>
						</div>
						<button onClick={() => handleConfirmation()} className="checkout__confirm-btn">Confirm</button> 
					</div>
					</>}
				</main>
			</div>
			: <Confirmation order={order}/>}
		</>
	)
}

export default Checkout;
