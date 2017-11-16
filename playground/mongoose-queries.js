const {ObjectID}=require('mongodb');
var {mongoose}=require('./../server/db/mongoose');
var {Todo}=require('./../server/models/todo');
var {User}=require('./../server/models/user');

var id='5a0c2b1f06853b6410cb613711';
var userID='59fc5329eb374ce824e86254';

// if(!ObjectID.isValid(id)){
//   console.log('id not valid');
//   return
// }

// //returns the array - if nothing returns empty array
// Todo.find({
//     _id:id
//   }).then((todos)=>{
//     if(todos.length===0){
//       return console.log('IDs not found');
//     }
//     console.log('todos',todos);
//   });
//
// //Returns the obejct/if not found returns null
//   Todo.findOne({
//       _id:id
//     }).then((todo)=>{
//       if(!todo){
//         return console.log('ID not found');
//       }
//       console.log('todo',todo);
//     });

// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('ID not found');
//   }
//   console.log('todoById',todo);
// }).catch((e)=>console.log(e));

 User.findById(userID).then((user)=>{
   if(!user){
     return console.log('userID not found');
   }
   console.log(JSON.stringify(user,undefined,2));
 }).catch((e)=>console.log(e));
