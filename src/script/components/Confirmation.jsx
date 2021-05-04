import React from 'react';
import '../../style/checkout.scss';

const Confirmation = (props) => {

	let priceList = [];

	// Räknar ut cartens totala pris
	props.order.map((item) => {
		return priceList.push(item.price);
	})

	const totalPrice = priceList.reduce((total, price, index) => total + price, 0);
	//

	return (
		<div>
			{props.order <= 0 ? null :
			<main className="row">
				<div className="columns small-12 medium-12 large-12 checkout__message">
					<h1>Thank you for ordering!</h1>
					<p>
					Hey Hanna,<br></br>
					Let us know if you any questions or concerns, order@showroom.com or 020 00 00 00.<br></br>
					Your order is soon on its way!
					</p>
				</div>
				<div className="columns small-12 medium-6 large-6 checkout__cart-items">
					<ul>
					{props.order.map((cartItem, index) => 
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
				<h3 className="checkout__step">Customer information</h3>
				<p>Hanna Möllergren</p>
				<p>Test steet 12</p>
				<p>411 16 Gothenburg</p>
				<p className="checkout__phone">+46700 00 00 00</p>
				<p>hanna@test.se</p>
				
				<h3 className="checkout__step">Delivery methods</h3>
				<div className="checkout__input-options">
					<label>Express delivery</label>
					<p>39 kr</p>
				</div>
				<h3 className="checkout__step">Payment methods</h3>
				<div className="checkout__input-options">
					<label>Klarna faktura</label>
				</div>
				<h3 className="checkout__step">Picked showroom</h3>
				<div className="checkout__input-options">
					<label>Kalmar</label>
				</div>
				</div>
				<div className="columns small-12 large-12">
					<div className="checkout__total-price">
						<h4>Total</h4>
						<h4>{totalPrice} kr</h4>
					</div>
					<a href="/browse"><button className="checkout__shopMore-btn">Shop more</button></a> 
				</div>
			</main>
			}
		</div>
	)
}

export default Confirmation;	