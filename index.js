var express = require('express');
var app = express();
var AWS = require('aws-sdk');
var _ = require('underscore');

AWS.config.update({region: "us-east-1"});

var  s3 = new AWS.S3();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
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
      res.send('hey');
    }
  });
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})


//ozan/3d_marketplace