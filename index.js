const express = require('express');
const app = express();
const cors = require('cors');
const client = require('./Mongo.js');
const {ObjectId} = require('mongodb');

const collectionName = 'aircraft_parts';
const dbName = 'airbusdb';

app.use(express.json());
app.use(cors());
app.use('*',function(req, res, next) { //allow cross origin requests

   
    
    res.setHeader('Access-Control-Allow-Origin', `*`);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.get('/',(req,res) => {res.send('hello')});

app.get('/search',async (req,res) => {
     try{

        const page = parseInt(req.query.page);
        const query = req.query.q;
        const limit = parseInt(process.env.LIMIT);
        const skip = (page - 1) * limit; 
        let result = await client.connect();
  
        let db = result.db(dbName);
  
        let collection = db.collection(collectionName);
  
  
         
           let values = await collection.find({"Part Name":{$regex:req.query.q}}).skip(skip).limit(limit).toArray();
           
           res.json(values);
        
        client.close();

     }catch(e){
       res.send({error:e})
    }

})


app.get('/search/:id',async (req,res) => {
     try{


        let result = await client.connect();
  
        let db = result.db(dbName);
  
        let collection = db.collection(collectionName);
  
  
         
           let values = await collection.findOne({_id:new ObjectId(req.params.id)});
           
           res.send(values);
        
        client.close();

     }catch(e){
       res.send({error:e})
    }

})

app.get('/search/unique',async (req,res) => {
     try{


        let result = await client.connect();
  
        let db = result.db(dbName);
  
        let collection = db.collection(collectionName);
  
  
         
           let values = await collection.distinct('Material Composition');
           console.log(values);
           res.send(values);
        
        client.close();

     }catch(e){
       res.send(e)
    }

})




app.listen(3000,() => {
	console.log('listenning on PORT 3000');
})