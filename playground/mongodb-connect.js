// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db)=>{
    if(err){
      return console.log('unable to connect to mongoDB server')
    };
    console.log('connected to mongoDB server')

    // db.collection('Todos').insertOne({
    //     text:'something to add',
    //     completed:false
    // },(err,result)=>{
    //   if(err){
    //     return console.log('unable to insert todo',err)
    //   };
    //   console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
    //     name:'ChrisD',
    //     age:43,
    //     location:'Dublin'
    // },(err,result)=>{
    //   if(err){
    //     return console.log('unable to insert user',err)
    //   };
    //   console.log(result.ops[0]._id.getTimestamp());
    // });

    db.close();
});
