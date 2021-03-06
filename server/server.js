require('./config/config');

const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');

//Deconstruction allows you to create a constant with is an object directly from a file
var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');
var {authenticate}=require('./middleware/authenticate');
const {ObjectID}=require('mongodb');

//Use Express
var app=express();
const port=process.env.PORT;

//configure middleware to use BodyParser
app.use(bodyParser.json());

//Authenticate function uses middleware to authenticate token
app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user);
});

app.post('/users/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);

    //verify that user exists
    User.findByCredentials(body.email,body.password).then((user)=>{
      //return the user with the Token attached so it can be used on Subsequnt calls.
      return user.generateAuthToken().then((token)=>{
        res.header('x-auth',token).send(user);
      });
    }).catch((err)=>{
      res.status(400).send();
    });
});

//Set up post Route
app.post('/todos',authenticate,(req,res)=>{

  var todo=new Todo({
    text:req.body.text,
    _creator:req.user._id
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

//POST Users, use pick, save ,200,400
app.post('/users',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    var user=new User(body);
    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos',authenticate,(req,res)=>{
  Todo.find({
    _creator:req.user._id
  }).then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  })
});

// GET /todos/1234324
app.get('/todos/:id',authenticate,(req,res)=>{
  var id=req.params.id
  if(!ObjectID.isValid(id)){
    return res.status(400).send();
  }
  Todo.findOne({
    _id:id,
    _creator:req.user._id
  }).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
      return res.status(200).send({todo});
  }).catch((e)=>res.status(400).send());
});

app.delete('/todos/:id',authenticate,(req,res)=>{
  //get the ID
  var id=req.params.id
  //Validate the ID - > 404
  if(!ObjectID.isValid(id)){
    return res.status(400).send();
  }
  Todo.findOneAndRemove({
    _id:id,
    _creator:req.user._id
  }).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
      return res.status(200).send({todo});
  }).catch((e)=>res.status(400).send());
});

app.delete('/users/me/token',authenticate,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  },()=>{
    res.status(400).send();
  })
})

app.patch('/todos/:id',authenticate,(req,res)=>{
  var id=req.params.id;
  //subset of things user passed
  var body=_.pick(req.body,['text','completed']);

  if(!ObjectID.isValid(id)){
    return res.status(400).send();
  }
  //update completed by properties
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt=new Date().getTime();
  }else{
    body.completed=false;
    body.completedAt=null;
  }

  Todo.findOneAndUpdate({
    _id:id,
    _creator:req.user._id
  },{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});

  }).catch((e)=>{
    response.status(400).send();
  })
});

//Set up web server
app.listen(port,()=>{
  console.log(`Server Started:Listening on port ${port}`);
});

module.exports={app};
