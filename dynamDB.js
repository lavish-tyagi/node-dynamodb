var AWS = require("aws-sdk");

class dynamoDB {

    constructor() {
        this.configureAWS();
        this.dynamodb = new AWS.DynamoDB();
        this.s3 = new AWS.S3({
            signatureVersion: 'v4'
        });
    }
    /**
     * @method configureAWS
     * @description Set access key id and secret access key for aws
     * @returns {void}
     */
    configureAWS() {
        AWS.config.update({
            accessKeyId: "fakeid",
            secretAccessKey: "fakesecret",
            region: "us-east-2",
            endpoint: "http://localhost:8000"
        })
    }

    createCarTable(tableName){
        var params = {
            TableName : tableName,
            KeySchema: [
                { AttributeName: "id", KeyType: "HASH"},  //Partition key
        ],
            AttributeDefinitions: [
                { AttributeName: "id", AttributeType: "N" },
        ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };
        this.dynamodb.createTable(params, function(err, data) {
            if (err) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
            }
        });
    }

    createMusicTable(){
        var params = {
            TableName : "Music",
            AttributeDefinitions: [
                // { AttributeName: "id", AttributeType: "N"},  //Partition key
                { AttributeName: "Artist", AttributeType: "S"}, 
                { AttributeName: "SongTitle", AttributeType: "S"}
            ], 
            KeySchema: [
                // { AttributeName: "id", KeyType: "HASH" },
                { AttributeName: "Artist", KeyType: "HASH"}, 
                { AttributeName: "SongTitle", KeyType: "RANGE"}
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };
        this.dynamodb.createTable(params, function(err, data) {
            if (err) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
            }
        });
    }

    putMusicItems(){
        var params = {
            Item: {
                "AlbumTitle": {
                    S: "Somewhat Famous"
                    }, 
                "Artist": {
                    S: "No One You Know"
                    }, 
                "SongTitle": {
                    S: "Call Me Today"
                    }
            }, 
            ReturnConsumedCapacity: "TOTAL", 
            TableName: "Music"
        };
        this.dynamodb.putItem(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
       });
    }

    getItem(){
        var params = {
            TableName: "Music"
        };
        this.dynamodb.scan(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log('hello',JSON.stringify(data)); // successful response
       });
    }

    deleteTable(tableName){
        var params = {TableName: tableName};
        this.dynamodb.deleteTable(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
       });

    }
}

module.exports = dynamoDB;