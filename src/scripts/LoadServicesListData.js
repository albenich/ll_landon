var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to ServiceList table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var serviceListData = 
  JSON.parse(fs.readFileSync('../components/data/services_list.json', 'utf8'));

serviceListData.forEach(function(service) {
  var params = {
    TableName: "ServiceList",
    Item: {
      "service": service.service
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for service",
                    service.service, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", service.service, "to table.")
  })
});