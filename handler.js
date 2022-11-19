'use strict';

const { settings } = require("./config/serverless/setting");
const axios = require('axios');
const cheerio  = require('cheerio')
const {v4} = require('uuid');

const aws = require('aws-sdk');
const dynamoClient = new aws.DynamoDB.DocumentClient()

class Handler {

  static async main(event){

    console.log(new Date())
    const {data} = await axios.get(settings.commitMessageUrl)
    const $ = cheerio.load(data);
    const [commitMessage] = await $("#content").text().trim().split('\n')
    console.log(commitMessage);

    const params = {
      TableName: settings.DbTableName,
      Item:{
        commitMessage,
        id:v4(),
        createdAt: new Date().toISOString()
      }
    }

    await dynamoClient.put(commitMessage).promise()


    return {
      statsCode: 200
    }



  }

}

module.exports = {
scheduler: Handler.main

}
