const jwt = require('jsonwebtoken');

var data={
  id:4
};

var token=jwt.sign(data,'Batman');
console.log(token);

var decoded=jwt.verify(token,'Batman');
console.log('decoded',decoded);
