const {ObjectID}=require('mongodb');
var {mongoose}=require('./../server/db/mongoose');
var {Todo}=require('./../server/models/todo');
var {User}=require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//   console.log(result);
// });
//
// Todo.findOneAndRemove({}).then((result)=>{
//   console.log(result);
// });

// Todo.findByOneAndRemove({_id:'5a141a87dd558bcafe173e65'}).then((todo)=>{
//   console.log(todo);
// });

Todo.findByIdAndRemove('5a141a87dd558bcafe173e65').then((todo)=>{
  console.log(todo);
});
