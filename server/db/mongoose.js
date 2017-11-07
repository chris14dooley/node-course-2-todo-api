var mongoose=require('mongoose');

//Configure Mongoose
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports={mongoose};
