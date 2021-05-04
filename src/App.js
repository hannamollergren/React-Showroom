import React, {useEffect} from 'react'; 
import axios from 'axios';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Footer from './script/components/Footer';
import Header from './script/components/Header';
import NavigationMobile from './script/components/NavigationMobile';
import Home from './script/components/Home';
import ProductList from './script/components/ProductList';
import News from './script/components/News';
import Search from './script/components/Search';
import Favorites from './script/components/Favorites';
import MyPages from './script/components/MyPages';
import Checkout from './script/components/Checkout';
import Inspiration from './script/components/Inspiration';
import TheRoom from './script/components/TheRoom';
import Start from './script/containers/Start';
import { getProducts } from './script/actions';
import { getCart } from './script/actions';

function App() {

	const dispatch = useDispatch();
	
	useEffect(() => {
		async function getAllProducts() {
			await axios.get('/api/allproducts')
				.then(res => {
					dispatch(getProducts(res.data));
				})
				.catch(err => {
					console.log('Something went wrong', err)
				})
		}
	
		async function getTotalCart() {
			await axios.get('/api/cart')
				.then(res => {
					dispatch(getCart(res.data));
				})
				.catch(err => {
					console.log('Something went wrong', err)
				})
		}
		
		getAllProducts();
		getTotalCart();
	}, [])


	return (
		<Router>
			<div>
				<Header />
				<Search/>
				<Route path="/" exact component={Start} />
				<Route path="/home" component={Home} />
				<Route path="/browse" component={ProductList} />
				<Route path="/news" component={News} />
				<Route path="/favorites" component={Favorites} />
				<Route path="/mypages" component={MyPages} />
				<Route path="/checkout" component={Checkout} />
				<Route path="/inspiration" component={Inspiration} />
				<Route path="/theroom" component={TheRoom} />
				<NavigationMobile />
				<Footer />
			</div>
		</Router>
	);
}

export default App;