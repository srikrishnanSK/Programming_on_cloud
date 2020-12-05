'use strict';

const AWS = require('aws-sdk');
AWS.config.update({
  credentials: new AWS.Credentials('AKIAXPBQ5X6BCMDPPU76', 'sb8BHKG1Rnqhg3vwLzRY2rEyvf2OJztRRp8vWfus'),
  region: 'us-east-1'
});

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'https://vpc-programs-onhksyuxfoqrwh2lpfjqimlsiy.us-east-1.es.amazonaws.com',
  //connectionClass: require('http-aws-es'),
  log: 'trace',
  apiVersion: '7.7', // use the same version of your Elasticsearch instance
});

module.exports.hello = async event => {
  console.log(event)
  for (var i = 0; i < event.Records.length; i++) {
    var record = event.Records[i];
    console.log(record.dynamodb)
    try {
      if (record.eventName === "INSERT") {
        var result = await client.create({
          index: 'programs',
          type: 'programs',
          id: record.dynamodb.Keys.ProgramId.S,
          body: {
            ProgramId: record.dynamodb.NewImage.ProgramId.S,
            CollegeName: record.dynamodb.NewImage.CollegeName.S,
            Engineering: record.dynamodb.NewImage.Engineering.S,
            Department: record.dynamodb.NewImage.Department.S,
            Duration: record.dynamodb.NewImage.Duration.S,
            startTerm:  record.dynamodb.NewImage.startTerm.S,
            Level: record.dynamodb.NewImage.Level.S,
            Faculty: record.dynamodb.NewImage.Faculty.S,
            PrimaryCampus: record.dynamodb.NewImage.PrimaryCampus.S

          }
        });
        console.log("==== completed ====");
        console.log(result);
      }
    }

    catch (err) {
      console.log(err);
    }

    client.get
  }
  return `Successfully processed: ${event.Records.length} records.`;
};
