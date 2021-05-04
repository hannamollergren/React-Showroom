import React, {useState} from 'react';
import '../../style/productDisplay.scss';
import DropdownSizes from './Dropdown-Sizes'; 
import Colors from './Colors'; 
import Accordion from './Accordion';
import { useSelector } from 'react-redux';
import { getCart } from '../actions';
import { useDispatch } from 'react-redux';

const ProductDisplay = (props) => {

	const dispatch = useDispatch();

	let cartList = useSelector(state => state.cart);
	let newCartList = [...cartList];

	const [size, setSize] = useState('');
	const [color, setColor] = useState('');
	const [description, setDescription] = useState(props.choosenProduct.description);
	
	const backToProductList = () => {
		props.setDisplayChoosenProduct(false)
	}

	async function addToCart(product){

		let cartItem = {
			brand: product.brand,
			name: product.name,
			color: color,
			size: size,
			price: product.price,
			images: product.images
		}

		try {
			const response = await fetch('/api/addtocart', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify(cartItem)
			})
			// Uppdaterar Redux Cart 
			newCartList.push(cartItem)
			dispatch(getCart(newCartList));

			const text = await response.text();
			JSON.parse(text); 

		} catch (error) {
			console.log('Something went wrong when adding to cart: ', error)
		}	
	}

	return (
		<div>
			<main className="product-display__content-container row">
			<button className="product-display__back-btn" onClick={() => backToProductList()}>Back</button> {/* FIXA BACK */}
				<div className="product-display__left-column columns small-12 medium-9 large-8">
					<div>
						<div className="product-display__image" style={{
							backgroundImage: `url(${props.choosenProduct.images[0]})`,
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center'
						}}></div>
						<div className="product-display__image" style={{
							backgroundImage: `url(${props.choosenProduct.images[1]})`,
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center'
						}}></div>
					</div>
					<div className="product-display__accordion ">
						<Accordion description={props.choosenProduct.description}/>
					</div>
				</div>
				<div className="product-display__right-column columns small-12 medium-3 large-4">
					<div>
						<p className="product-display__product--brand">{props.choosenProduct.brand}</p>
						<p className="product-display__product--name">{props.choosenProduct.name}</p>
						<p className="product-display__product--price">{props.choosenProduct.price} kr</p>
					</div>
					<Colors color={color} setColor={setColor} choosenProduct={props.choosenProduct}/>
					<div>
						<DropdownSizes size={size} setSize={setSize} inputLabel='Select a size' choosenProduct={props.choosenProduct}/>
						<button disabled={!size || !color}className="product-display__add-btn" onClick={() => addToCart(props.choosenProduct)}>Add to cart</button>
					</div>
				</div>
				<div className="product-display__top-column--mobile columns small-12 medium-8 large-8">
					<Colors color={color} setColor={setColor} inputLabel='Choose a color' choosenProduct={props.choosenProduct}/>
					<Accordion description={description} setDescription={setDescription}/>
				</div>
			</main>
			<div className="product-display__bottom-column--mobile columns small-12 medium-8 large-8">
					<div className="product-display__product--container">
						{/* EVENTUELLT ADDERA FAVORITES FUNKTIONEN */}
						<div>
							<p className="product-display__product--brand">{props.choosenProduct.brand}</p>
							<p className="product-display__product--name">{props.choosenProduct.name}</p>
						</div>
						<p className="product-display__product--price">{props.choosenProduct.price} kr</p>
					</div>
					<div className="row">
						<div className="columns product-display__size-container">
							<DropdownSizes size={size} setSize={setSize} inputLabel='Choose a size' choosenProduct={props.choosenProduct}/>
						</div>
						<div className="columns">
							<button disabled={!size || !color} className="product-display__add-btn" onClick={() => addToCart(props.choosenProduct)}>Add to cart</button>
						</div>
					</div>
				</div>
		</div>
	)
}

export default ProductDisplay;