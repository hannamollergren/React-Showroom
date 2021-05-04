const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
/* const { cloudinary } = require('./cloudinary') */
const cors = require('cors');
const { getAllProducts, editProduct, addProduct, getCart, deleteCart } = require('./database.js');
 
/* const port = 1234; */ // Port number
const port = process.env.PORT || 1234;  

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '2mb'}));
app.use(cors());
app.use(express.static(path.join(__dirname, '/../build')))


app.get('/api/allproducts', (req, res) => {
	console.log('/api/allproducts')
	getAllProducts(dataOrError => {
		res.send(dataOrError);
	})
})

app.put('/api/editproduct', (req, res) => {
	console.log('/api/editproduct', req.body)
	const productID = req.body.id;
	const updatedFavorite = req.body.favorite;
	editProduct( productID, updatedFavorite, dataOrError => {
		res.send(dataOrError);
	})
})

app.get('/api/cart', (req, res) => {
	console.log('/api/cart')
	getCart(dataOrError => {
		res.send(dataOrError);
	})
})

app.post('/api/addtocart', (req, res) => {
	console.log('POST / addProduct', req.body)
	addProduct(req.body, dataOrError => {
		res.send(dataOrError);
	})
});

app.delete('/api/deletecart', (req, res) => {
	console.log('DELETE / deletecart')
	deleteCart(dataOrError => {
		res.send(dataOrError);
	})
});

app.get('/', (request,response) => {
   response.send('The cake is a lie')
})

app.use((req, res, next) => {
	res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(port, () => {
   console.log('Web server listening on port ' + port)
});