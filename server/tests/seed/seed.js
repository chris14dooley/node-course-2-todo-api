const {ObjectID}=require('mongodb');
const {Todo}=require('./../../models/todo');
const {User}=require('./../../models/user');
const jwt = require('jsonwebtoken');

const todos=[{
  _id:new ObjectID(),
  text:'ONE test todo'
},{
  _id:new ObjectID(),
  text:'TWO test todo',
  completed:true,
  completedAt:333
}];

const userOneID=new ObjectID();
const userTwoID=new ObjectID();

const users=[{
  _id:userOneID,
  email:'batman@gmail.com',
  password:'userOnePass',
  tokens:[{
    access:'auth',
    token: jwt.sign({_id:userOneID,access:'auth'},'abc123').toString()
  }]
},{
  _id:userTwoID,
  email:'robin@gmail.com',
  password:'userTwoPass'
}];

const populateTodos=(done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>done());
};

const populateUsers=(done)=>{
  User.remove({}).then(()=>{
    var userOne=new User(users[0]).save();
    var userTwo=new User(users[1]).save();

    return Promise.all([userOne,userTwo])
  }).then(()=>done());
};

module.exports={todos,populateTodos,users,populateUsers};
