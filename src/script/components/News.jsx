import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import ProductList from './ProductList';

const News = () => {

	let productList = useSelector(state => state.productList);

	const [displayNews, setDisplayNews] = useState(true);
	let newsList = [];
	
	productList.map((product) => {
		if(product.new === true) {
			 newsList.push(product)	
		}
		return null;
	})

	return (
		<div>
			<ProductList h1='News' h2='Get the latest trends' setDisplayNews={setDisplayNews} displayNews={displayNews} newsList={newsList}/>
		</div>
	)
}
export default News;