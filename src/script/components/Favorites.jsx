import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import '../../style/productList.scss';
import '../../style/favorites.scss';
import Hero from './Hero.jsx';
import axios from 'axios';
import { getProducts } from '../actions';
import { useDispatch } from 'react-redux';
import ProductDisplay from './ProductDisplay';

const Favorites = () => {

	const dispatch = useDispatch();

	let productList = useSelector(state => state.productList);

	const [displayChoosenProduct, setDisplayChoosenProduct] = useState(false);
	const [choosenProduct, setChoosenProduct] = useState(null);
	let favoritesList = [];
	
	productList.map((product) => {
		if(product.favorite === true) {
			favoritesList.push(product)		
		}
	})

	async function handleFavorite(product) {

		try {
			await axios.put('/api/editproduct', {
				id: product._id,
				favorite: !product.favorite
			})
			getAllProducts();
				
		}
		catch (error) {
			console.log('Something went wrong ', error)
		}
	}

	async function getAllProducts() {
		await axios.get('/api/allproducts')
			.then(res => {
				dispatch(getProducts(res.data));
			})
			.catch(err => {
				console.log('Something went wrong', err)
			})
	}

	const handleChoosenProduct = (product) => {
		setChoosenProduct(product);
		setDisplayChoosenProduct(true);
	}

	return (
		<div>	
			{!displayChoosenProduct ?
				<>
				<Hero cssClassHero='favorites__hero-block' cssClassImage='favorites__hero-block-image' cssClassButton='' link='' label='' h1='Favorites' h2='Let them be yours'/>
				<main className="row"> 
				{!favoritesList.length > 0 ?  <div className="columns large-12"><h3 className="favorites__page-title">No favorites yet... </h3></div> : 
				<div className="columns small-12 large-12">
					<ul className="row favorites__container">
						{favoritesList.map((product, index) => 
							<li className="product-list__item-container columns small-12 medium-4 large-3" key={index} onClick={() => handleChoosenProduct(product)}>
								<div className="product-list__image" style={{
									backgroundImage: `url(${product.images[0]})`,
									backgroundSize: 'cover',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center'
								}}>
									<button className="favorites__remove-btn" onClick={(e)=> {e.stopPropagation(); handleFavorite(product)}}></button>
								</div>
								<p><span>{product.brand}</span></p>
								<p>{product.name}</p>
								<p>{product.price} kr</p>
							</li> 
						)}
					</ul>
				</div>}
			</main>
			</> : 
			<ProductDisplay choosenProduct={choosenProduct} displayChoosenProduct={displayChoosenProduct} setDisplayChoosenProduct={setDisplayChoosenProduct}/>}
		</div>
	)
}
export default Favorites;
