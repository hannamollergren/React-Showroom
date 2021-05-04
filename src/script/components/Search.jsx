import React, {useState} from 'react'
import '../../style/search.scss';
import { useSelector } from 'react-redux';
import ProductDisplay from './ProductDisplay';

const Search = (props) => {

	let productList = useSelector(state => state.productList);
	const [filter, setFilter] = useState('');
	const [choosenProduct, setChoosenProduct] = useState(null);
	const [displayChoosenProduct, setDisplayChoosenProduct] = useState(false);
	let result = null;

	const handleChoosenProduct = (product) => {
		setChoosenProduct(product);
		setDisplayChoosenProduct(true);
	}

	result = 
			productList
			.filter(product => {
				return product.name.toLowerCase().includes(filter.toLowerCase()) ||  product.brand.toLowerCase().includes(filter.toLowerCase())
			})
			.map((product, id) =>
				<>
				{!props.displaySearch ? 
				<div className="search__result" key={id} onClick={() => handleChoosenProduct(product)}>
					<p>{product.name}</p>
				</div>:
				<div className="search__result--mobile" key={id} onClick={() => handleChoosenProduct(product)}>
					<p>{product.name}</p>
				</div>}
				</>
			)

	return (
		<div className="search">
		<div className="search__input-container">
			{!props.displaySearch ? 
			<input onChange={e => setFilter(e.target.value)} type="text" placeholder="What are you looking for?" className="search__input"></input> :
			<input onChange={e => setFilter(e.target.value)} type="text" placeholder="What are you looking for?" className="search__input--mobile"></input>
			}	
		</div>
		{!displayChoosenProduct ? !filter ? null : <div className={`${!props.displaySearch ? 'search__container' : 'search__container--mobile'}`}>{result}</div> : <ProductDisplay choosenProduct={choosenProduct} displayChoosenProduct={displayChoosenProduct} setDisplayChoosenProduct={setDisplayChoosenProduct}/>}
		</div>
	)
}
export default Search;
