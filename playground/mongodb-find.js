// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj=new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db)=>{
    if(err){
      return console.log('unable to connect to mongoDB server')
    };
    console.log('connected to mongoDB server')

    //Find() returns a Cursor to the records
    //toArray converts to array and returns a Promise
    //

    db.collection('Users').find({
      name:'ChrisD'
    }).toArray().then((docs)=>{
      console.log('Users');
      console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('unable to fetch users',err)
    });

    db.collection('Todos').find().count().then((count)=>{
      console.log(`Todos:${count}`);

    },(err)=>{
        console.log('unable to fetch todos',err)
    });

    //db.close();
});
