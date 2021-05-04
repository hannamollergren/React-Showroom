import React, {useState} from 'react'; 
import { useSelector } from 'react-redux';
import '../../style/home.scss';
import Hero from './Hero.jsx';
import HorizontalContainer from './HorizontalContainer.jsx';
import ProductDisplay from './ProductDisplay';

const Home = () => {

	let productList = useSelector(state => state.productList);

	const [choosenProduct, setChoosenProduct] = useState(null);
	const [displayChoosenProduct, setDisplayChoosenProduct] = useState(false);

	const limit = 10;
	const newsList = productList
	.map(x => ({ x, r: Math.random() }))
	.sort((a, b) => a.r - b.r)
	.map(a => a.x)
	.slice(0, limit);
	

	return (
		<>
		{!displayChoosenProduct ? 
		<div className="home">
			<Hero cssClassHero='home__hero-block' cssClassImage='home__hero-block-image' cssClassButton='home__shopNow-button' link='/news' label='Shop now' h1='This week fashion' h2='New favorites for you'/>
			<main>
				<HorizontalContainer newsList={newsList} choosenProduct={choosenProduct} setChoosenProduct={setChoosenProduct} displayChoosenProduct={displayChoosenProduct} setDisplayChoosenProduct={setDisplayChoosenProduct}/>
			</main>
		</div> :
		<ProductDisplay choosenProduct={choosenProduct} displayChoosenProduct={displayChoosenProduct} setDisplayChoosenProduct={setDisplayChoosenProduct}/>}
		</>
	)
}
export default Home;