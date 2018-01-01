
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

var connObj = "";
function createOrFetchConnection(callback){
    MongoClient.connect(url, function(err, db) {
        if(err){
          console.log("Error in DB Connection"+err);
          connObj = "";
        }
        else{
            var dbase = db.db("ANALYTICSDB");
            connObj = dbase;
            connObj.createCollection('users', function(err, collection) {});
        }
        callback(connObj);
      });
}

module.exports = {
    CreateOrFetchConnection : createOrFetchConnection
}
