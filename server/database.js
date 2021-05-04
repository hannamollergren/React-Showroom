const {MongoClient, ObjectID} = require('mongodb');
/* const url = 'mongodb://localhost:27017'; */
const url = 'mongodb+srv://showroom:showroom2021@hanna.qo8ls.gcp.mongodb.net/ShowRoom?retryWrites=true&w=majority';
const dataBase = 'ShowRoom';
const productCollection = 'products';
const cartCollection = 'cart';

function getProducts(filter, callback) {
    MongoClient.connect( url, { useUnifiedTopology : true }, async (error, client)=>{ 

        if(error){
            callback('Can not connect to database', error.message)
            console.log(error)
            return;
        }

        const theCollection = client.db(dataBase).collection(productCollection); 
		
        try{
            const cursor = theCollection.find();
            const array = await cursor.toArray();
            callback(array);

        } catch(error){
            console.log('Wrong query, error: ', error.message);
            callback('Wrong query'); 

        } finally{
            client.close();
        }
    })
}

function editProduct(productID, updatedFavorite, callback){
	console.log('editproduct i database id och favorite', productID, updatedFavorite)

	let id = {_id:new ObjectID(productID)}

	MongoClient.connect(url, {useUnifiedTopology: true},
        async (error, client) => {
            if (error){
                callback("'Error! Couldnt connect'");
                return;
			}
			
			const col = client.db(dataBase).collection(productCollection);
			
            try {
                const result = await col.updateOne(id,{$set:{favorite: updatedFavorite}})
                callback({
                    result:result.result,
                    ops:result.ops
                })
			} 
			catch(error) {
                console.error('Failed to update product: ' + error.message);
                callback('"ERROR! query error"');
			} 

			finally {
                client.close();
            }
        }
    )
}

function getCart(callback) {
    MongoClient.connect( url, { useUnifiedTopology : true }, async (error, client)=>{ 

        if(error){
            callback('Can not connect to database', error.message)
            console.log(error)
            return;
        }

        const theCollection = client.db(dataBase).collection(cartCollection); 

        try{
            const cursor = theCollection.find();
            const array = await cursor.toArray();
            callback(array);

        } catch(error){
            console.log('Wrong query, error: ', error.message);
            callback('Wrong query'); 

        } finally{
            client.close();
        }
    })
}

function deleteCart(callback){
	console.log('database deleteCart')
    MongoClient.connect(url, {useUnifiedTopology: true},
        async (error, client) => {
            if (error){
                callback("'Error! Couldnt connect'");
                return;
            }
            client.db(dataBase).collection(cartCollection).drop();
        }
    )
}

function addProduct(reqBody, callback){
	console.log('database addProduct', reqBody)
    const document = reqBody;
    MongoClient.connect(url, {useUnifiedTopology: true},
        async (error, client) => {
            if (error){
                callback("'Error! Couldnt connect'");
                return;
            }
            const col = client.db(dataBase).collection(cartCollection);
            try {
                const result = await col.insertOne(document);
                callback({
                    result: result.result,
                    ops: result.ops
                })
            } catch(error){
                console.error('Failed to add product: ' + error.message);
                callback('"ERROR! query error"');
            } finally{
                client.close();
            }
        }
    )
}

function getAllProducts(callback) {
    getProducts({}, callback)
}


module.exports = {
	getAllProducts,
	editProduct,
	addProduct,
	getCart,
	deleteCart
}
