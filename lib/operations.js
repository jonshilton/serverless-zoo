import uuid from 'uuid/v4';
import AWS from 'aws-sdk'; // eslint-disable-line import/no-extraneous-dependencies
import dynamodb from 'serverless-dynamodb-client';

let docClient;

if (process.env.NODE_ENV === 'production') {
  docClient = new AWS.DynamoDB.DocumentClient();
} else {
  docClient = dynamodb.doc;
}

class Operations {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async createRecord(args) {
    const newRecord = Object.assign({}, args, { id: uuid() });
    await docClient
      .put({
        TableName: this.tableName,
        Item: newRecord
      })
      .promise();
    return newRecord;
  }

  async updateRecord(args) {
    const pk = args.id;
    const exprVals = {};
    const exprNames = {};
    const expr = [];
    Object.keys(args).forEach((key, index) => {
      if (key !== 'id') {
        expr.push(`#${key} = :v${index}`);
        exprNames[`#${key}`] = key;
        exprVals[`:v${index}`] = args[key];
      }
    });
    const response = await docClient
      .update({
        TableName: this.tableName,
        Key: {
          id: pk
        },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: `set ${expr.join(', ')}`,
        ExpressionAttributeNames: exprNames,
        ExpressionAttributeValues: exprVals
      })
      .promise();
    return response.Attributes;
  }

  async getRecord(args) {
    const response = await docClient
      .query({
        TableName: this.tableName,
        KeyConditionExpression: 'id = :v1',
        ExpressionAttributeValues: {
          ':v1': args.id
        }
      })
      .promise();
    return response.Items[0];
  }

  async getRecords(args) {
    const limit = args && args.limit ? args.limit : 10;
    const startKey = args && args.nextToken ? { id: args.nextToken } : null;
    const response = await docClient
      .scan({
        TableName: this.tableName,
        Limit: limit,
        ExclusiveStartKey: startKey
      })
      .promise();
    return {
      items: response.Items,
      nextToken:
        response.LastEvaluatedKey && response.LastEvaluatedKey.id
          ? response.LastEvaluatedKey.id
          : null
    };
  }

  async deleteRecord(args) {
    const response = await docClient
      .delete({
        TableName: this.tableName,
        Key: {
          id: args.id
        },
        ReturnValues: 'ALL_OLD'
      })
      .promise();
    return response.Attributes;
  }
}

// eslint-disable-next-line import/prefer-default-export
export { Operations };
