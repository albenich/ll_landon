var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to ArrivalInfo table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var arrivalInfoList = 
  JSON.parse(fs.readFileSync('../components/data/arrival_info.json', 'utf8'));

arrivalInfoList.forEach(function(info) {
  var params = {
    TableName: "ArrivalInfo",
    Item: {
      "title": info.title,
      "info": info.info
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for gallery images",
                    info.title, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", info.title, "to table.")
  });
});