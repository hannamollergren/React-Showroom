import React, {useState} from 'react'; 
import '../../style/productList.scss';
import '../../style/news.scss';
import Hero from './Hero.jsx';
import { useSelector } from 'react-redux';
import DropDownCategory from './Dropdown-Category';
import DropDownSort from './Dropdown-Sort';
import axios from 'axios';
import { getProducts } from '../actions';
import { useDispatch } from 'react-redux';
import ProductDisplay from './ProductDisplay';

let sortOptions = ['Lowest price', 'Highest price'];
let categoryOptions = ['Clothing', 'Shoes', 'Accessories', 'Beauty'];

const ProductList = (props) => {

	const dispatch = useDispatch();

	let productList = useSelector(state => state.productList);
	
	const [category, setCategory] = useState('All products');
	const [sort, setSort] = useState('');
	const [choosenProduct, setChoosenProduct] = useState(null);
	const [displayChoosenProduct, setDisplayChoosenProduct] = useState(false);
	let filterList = [];

	// Props to Hero comp
	let h1 = 'Browse around';
	let h2 = 'Make yourself at home';
	let cssClassHero='product-list__hero-block' 
	let cssClassImage='product-list__hero-block-image'

	// News comp
	if (props.displayNews === true) {
		h1='News';
		h2='Get the latest trends';
		cssClassHero='news__hero-block' 
		cssClassImage='news__hero-block-image';
		filterList = props.newsList;
	}
	else {
		filterList = [...productList];
	}

	// Filter Category
	if(category === 'Clothing') {
		filterList = productList.filter(product => product.category === 'clothing');
	}
	if(category === 'Shoes') {
		filterList = productList.filter(product => product.category === 'shoes');
	}
	if(category === 'Accessories') {
		filterList = productList.filter(product => product.category === 'accessories');
	}
	if(category === 'Beauty') {
		filterList = productList.filter(product => product.category === 'beauty');
	}

	// Sorting
	if(sort) {
		if (sort === 'None') {
			console.log('none')
		}
		if (sort === 'Lowest price') {
			filterList = filterList.sort((a, b) => a.price - b.price);
		}
		if (sort === 'Highest price') {
			filterList = filterList.sort((a, b) => b.price - a.price);
		}
	}
	
	let count = filterList.length;


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
			<div>
				<Hero cssClassHero={cssClassHero} cssClassImage={cssClassImage} cssClassButton='' link='' label='' h1={h1} h2={h2}/>
				<main className="row">
					{props.displayNews ? null :
						<div className="product-list__left-column columns small-2 large-2">		
						<h2 className="product-list__category-title">{category}</h2>
							<ul>
								<li className="product-list__category-item" onClick={() => setCategory('All products')}>All products</li>
								<li className="product-list__category-item" onClick={() => setCategory('Clothing')}>Clothing</li>
								<li className="product-list__category-item" onClick={() => setCategory('Shoes')}>Shoes</li>
								<li className="product-list__category-item" onClick={() => setCategory('Accessories')}>Accessories</li>
								<li className="product-list__category-item" onClick={() => setCategory('Beauty')}>Beauty</li>
							</ul>
						</div>
					}
						{props.displayNews ? null :
							<div className="product-list__left-column-mobile columns small-12">
								{!productList.length > 0 ?  null : 
								<div>
									<h2 className="product-list__category-title-mobile">{category}</h2>
									<DropDownCategory category={category} setCategory={setCategory} inputLabel='Categories' menuItems={categoryOptions} cssClass='product-list__dropdown-categories-container'/>
								</div>}
							</div>
						}
						<div className={`product-list__right-column columns small-12 ${!props.displayNews ? 'large-10' : 'large-12'}`}>
							{!filterList.length > 0 ? <div><h3 className="product-list__loading">Loading... </h3><div className="lds-ripple"><div></div><div></div></div></div> :
							<div className={`${!props.displayNews ? 'product-list__content-container' : ''}`}>
								<div className="row product-list__dropdown-sort">
									<DropDownSort sort={sort} setSort={setSort} inputLabel='Sort' menuItems={sortOptions} productList={productList} cssClass='product-list__dropdown-container'/>
								</div>
								<p className="product-list__count">{count} products</p>
								<ul className="row product-list__container">
									{filterList.map((product, index) => 
										<li className="product-list__item-container columns small-12 medium-4 large-3" key={index} onClick={() => handleChoosenProduct(product)}>
											<div className="product-list__image" style={{
												backgroundImage: `url(${product.images[0]})`,
												backgroundSize: 'cover',
												backgroundRepeat: 'no-repeat',
												backgroundPosition: 'center'
											}}>
												<button className={product.favorite ? 'product-list__choosen-favorite' : 'product-list__not-favorite'} onClick={(e)=> {e.stopPropagation(); handleFavorite(product)}}></button>
											</div>
											<p><span>{product.brand}</span></p>
											<p>{product.name}</p>
											<p>{product.price} kr</p>
										</li> 
									)}
								</ul>
							</div>}
						</div>
					</main> 
				</div> :
			<ProductDisplay choosenProduct={choosenProduct} displayChoosenProduct={displayChoosenProduct} setDisplayChoosenProduct={setDisplayChoosenProduct}/>}
		</div>
	)
}
export default ProductList;