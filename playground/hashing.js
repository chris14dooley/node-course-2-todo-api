// const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var password='123abc!';

// //generate a Salted password Hash
// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//       console.log(hash);
//     })
// });

var hashedPassword='$2a$10$gj8rOCiHjdJRtdMGBQC0wedp.pTaZ65mn5cA3qmONEj5zmTuvlJsG';

bcrypt.compare('123abc!',hashedPassword,(err,res)=>{
  console.log(res);
})
//
// var data={
//   id:4
// };
//
// var token=jwt.sign(data,'Batman');
// console.log(token);
//
// var decoded=jwt.verify(token,'Batman');
// console.log('decoded',decoded);
