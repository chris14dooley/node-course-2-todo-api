const mongoose=require('mongoose');
const validator=require('validator');

//Create model
var User=mongoose.model('User',{
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true,
    unique:true,
    validate: {
      validator:validator.isEmail,
      message:'{value} is not a valid email'
      }
    },
    password:{
      type:String,
      require:true,
      minLength:6
    },
    tokens:[{
      access:{
        type:String,
        require:true
      },
      token:{
        type:String,
        require:true
      }
    }]
});

module.exports={User};
