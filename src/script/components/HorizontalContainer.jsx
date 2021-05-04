import React from 'react'
import '../../style/horizontalContainer.scss';

const HorizontalContainer = (props) => {


	const handleChoosenProduct = (product) => {
		props.setChoosenProduct(product);
		props.setDisplayChoosenProduct(true);
	}

	return (
		<div className="horizontal-container">
			<h4>Rekommenderat för dig</h4>
			<ul className="horizontal-container__product-list">
				{props.newsList.map((product, index) => 
					<li className="horizontal-container__product-item-container" key={index} onClick={() => handleChoosenProduct(product)}>
						<div className="horizontal-container__product-item" style={{
							backgroundImage: `url(${product.images[0]})`,
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center'
						}}></div>
						<p><span>{product.brand}</span></p>
						<p>{product.name}</p>
						<p>{product.price} kr</p>
					</li> 
				)}
			</ul>
		</div> 
	)
}

export default HorizontalContainer;
