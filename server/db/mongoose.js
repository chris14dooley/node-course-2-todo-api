var mongoose=require('mongoose');

//Configure Mongoose
mongoose.Promise=global.Promise;
//mongoose.connect('mongodb://chris14dooley:Dangermouse14mLab@ds113136.mlab.com:13136/nodedbcourse'||'mongodb://localhost:27017/TodoApp');
mongoose.connect(process.env.MONGODB_URI);

module.exports={mongoose};
