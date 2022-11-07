var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to Accessibilities table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var accessibilitiesData = 
  JSON.parse(fs.readFileSync('../components/data/accessibility_list.json', 'utf8'));

accessibilitiesData.forEach(function(accessibility) {
  var params = {
    TableName: "AccessibilityList",
    Item: {
      "item": accessibility.item
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for accessibility",
                    accessibility.item, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", accessibility.item, "to table.")
  })
});