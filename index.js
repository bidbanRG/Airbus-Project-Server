const express = require('express');
const app = express();
const cors = require('cors');
const client = require('./Mongo.js');
const {ObjectId} = require('mongodb');

const collectionName = 'aircraft_parts';
const dbName = 'airbusdb';

app.use(express.json());
app.use(cors());
app.get('/',(req,res) => {res.send('hello')});

app.get('/search',async (req,res) => {
     try{


        let result = await client.connect();
  
        let db = result.db(dbName);
  
        let collection = db.collection(collectionName);
  
  
         
           let values = await collection.find({"Part Name":{$regex:req.query.q}}).toArray();
           
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