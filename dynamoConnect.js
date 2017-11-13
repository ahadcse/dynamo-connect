'use strict';
const Promise = require('bluebird'),
    AWS = require('aws-sdk'),
    bunyan = require('bunyan'),
    bformat = require('bunyan-format');

AWS.config.setPromisesDependency(Promise);
const dynamoDB = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

function getDeviceDataFromUserid(id) {
    var params = {
        TableName: 'person',
        Key: {"id": id}
    };
    return dynamoDB.get(params).promise()
        .then(r => {
            return r;
        }).catch(function(err){
            console.log(err);
            return Promise.reject(err);
        });
}

function dynamoConnect() {
    return getDeviceDataFromUserid('user-id')
      .catch(function (err) {
        console.log(err);
        err.message = "Error occurred, " + err.message;
      });
};

console.log('Tenant: ' + dynamoConnect().then(function(data) {
    console.log(data.Item);
}));
