// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj=new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db)=>{
    if(err){
      return console.log('unable to connect to mongoDB server')
    };
    console.log('connected to mongoDB server')

  //findOneAndUpdate(filter, update, options, callback){Promise}
  // db.collection('Todos').findOneAndUpdate(
  //   {_id:new ObjectID('59fb29c4d770a64b45b0be05')}
  //   ,{$set:{completed:true}}
  //   ,{returnOriginal:false})
  //   .then((result)=>{
  //     console.log(result)
  //   });

  db.collection('Users').findOneAndUpdate(
    {_id:new ObjectID('59fb2db2d770a64b45b0bf3d')}
    ,{$set:{name:"chrisD"},$inc:{age:1}}
    ,{returnOriginal:false})
    .then((result)=>{
      console.log(result)
    });

  //db.close();
});
