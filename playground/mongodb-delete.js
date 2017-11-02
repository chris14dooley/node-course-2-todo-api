// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj=new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db)=>{
    if(err){
      return console.log('unable to connect to mongoDB server')
    };
    console.log('connected to mongoDB server')

  //delete many
  // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((res)=>{
  //   console.log(res);
  // });

  // db.collection('Users').deleteMany({name:'ChrisD'}).then((res)=>{
  //   console.log(res);
  // });

  //deleteOne - deletes first found
  // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((res)=>{
  //   console.log(res);
  // });

  //FindOneAndDelete
  db.collection('Users').findOneAndDelete({
    _id:123
    }).then((res)=>{
    console.log(res);
  });
  //db.close();
});
