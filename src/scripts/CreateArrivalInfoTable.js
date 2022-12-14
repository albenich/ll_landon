var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "ArrivalInfo",
  KeySchema: [
    // Partition Key
    { AttributeName: "title", KeyType: "HASH" },
    // Sort Keys
    { AttributeName: "info", KeyType: "RANGE"}  
  ],
  AttributeDefinitions: [
    { AttributeName: "title", AttributeType: "S" },
    { AttributeName: "info", AttributeType: "S" }
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: "ClassIndex",
      KeySchema: [
        { AttributeName: "title", KeyType: "HASH" },
        { AttributeName: "info", KeyType: "RANGE" }
      ],
      Projection: {
        ProjectionType: "KEYS_ONLY"
      }
    }
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err)
    console.error("Unable to create table: ", JSON.stringify(err, null, 2))
  else
    console.log("Created table with description: ", JSON.stringify(data, null, 2))
});