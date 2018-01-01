
var express = require('express');
var router = express.Router();
var respMsg = require('../util/Util.js');

/* GET users listing. */
router.post('/login', function (req, res, next) {
  var emailID = req.body.emailID;
  var password = req.body.password;

  global.DBconn.collection('users').find({
    "emailID": emailID,
    "password": password
  }).toArray(function (err, result) {

  });
});


router.post('/registration', function (req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var emailID = req.body.emailID;
  var password = req.body.password;

  var obj = {
    firstName: firstName,
    lastName: lastName,
    emailID: emailID,
    password: password
  }

  checkUserExists(emailID,password, function (userStatus) {
    if (userStatus.STATUS == "ERROR") {
      res.send(userStatus);
    }
    else {
      if(userStatus.DATA == true){
        res.send(userStatus);
      }
      else{
        global.DBconn.collection('users').insert(obj, function (err, docsInserted) {
          res.send(respMsg.ResponseMessage("SUCCESS","User Created Successfully",""));
        });  
      }
        
    }
  })
})


function checkUserExists(emailID,password, callback) {
  var response = {};
  global.DBconn.collection('users').findOne({
    "emailID": emailID,
    "password": password
  },function (err, result) {
    if(err){
      callback(respMsg.ResponseMessage("ERROR","Exception Occured",err));
    }
    else{
      if(result != null ){
        callback(respMsg.ResponseMessage("SUCCESS","User Already Exists",true))
      }
      else{
        callback(respMsg.ResponseMessage("SUCCESS","User Doesnot Exists",false));
      }
    }
  });
}
module.exports = router;