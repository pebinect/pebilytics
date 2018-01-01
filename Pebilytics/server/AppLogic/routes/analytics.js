
var express = require('express');
var router = express.Router();
var respMsg = require('../util/Util.js');

router.get('/connectors', function (req, res, next) {


  global.DBconn.collection('connectors').find({}).toArray(function (err, result) {
      if(err){
        res.send(respMsg.ResponseMessage("FAILURE","ERROR WHILE FETCHING CONNECTOR DETAILS",err));
      }
      else{
        res.send(respMsg.ResponseMessage("SUCCESS","",result));
      }
  });
});

module.exports = router;