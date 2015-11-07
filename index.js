var express = require('express');
var app = express();
var AWS = require('aws-sdk');
var _ = require('underscore');


var  s3 = new AWS.S3();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send('hello world');
  var params = {
    Bucket: "hifi-public",
    Marker: "ozan/3d_marketplace/sets",
    MaxKeys: 10
  };
  s3.listObjects(params, function(err, data) {
    if(err){
      console.log(err, err.stack);
    }
    else {
      var keys = _.pluck(data.Contents, 'Key')
      console.log(keys);
    }
  });
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})


//ozan/3d_marketplace