var express=require('express');
var bodyParser=require('body-parser');

//Deconstruction allows you to create a constant with is an object directly from a file
var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');

//Use Express
var app=express();

//configure middleware to use BodyParser
app.use(bodyParser.json());

//Set up post Route
app.post('/todos',(req,res)=>{

  var todo=new Todo({
    text:req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });

});

//Set up web server
app.listen(3000,()=>{
  console.log('Server Started:Listening on port 3000');
});

module.exports={app};
