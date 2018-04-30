// sam/lambda offer no internal depedency resolution. Because bcrypt is a built binary
// it must be built for the execution context. In this case... x64 linux node v57.
const AWS = require( 'aws-sdk' );
const bcrypt = require( 'bcrypt' );
const jwt = require('jsonwebtoken');

AWS.config.update( {
  "accessKeyId": "abcde",
  "secretAccessKey": "abcde",
  region: "us-west-2",
  endpoint: "http://192.168.1.6:32776/dynamodb_local_db",
} );

const dynamoDB = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function ( event, context, callback ) {
  switch ( event.httpMethod ) {
    case 'POST':
      const data = JSON.parse( event.body );
      const params = {
        TableName: 'Users',
        Item: {
          "username": data.username,
          "password": bcrypt.hashSync( data.password, 1 ),
        },
      };
      
      docClient.put( params, function( err, data ) {
        if ( err ) {
          console.error("Unable to add item. Error JSON:", err );
        } else {
          console.log( data );
          callback( null, {
            statusCode: 200,
            headers: {
              'content-type': 'application/json',
            },
          } );
        }
      } );
      break;
    case 'GET':
      const { username, password } = event.queryStringParameters;
      let resp = {
        statusCode: 403,
        headers: {
          'content-type': 'application/json',
        }
      };

      if ( !username || !password ) {
        return callback( null, resp );
      }

      const query = {
        TableName: 'Users',
        Key: {
          username: username
        }
      };

      docClient.get( query, function ( err, data ) {
        if ( err ) {
          resp.statusCode = 500;
        } else if ( !data.Item ) {
          resp.statusCode = 404;
        } else {
          if ( bcrypt.compareSync( password, data.Item.password ) ) {
            const token = jwt.sign( { username: data.Item.username }, process.env.JWT_SECRET );
            resp.statusCode = 200;
            resp.body = JSON.stringify( { token } );
          } else {
            resp.statusCode = 403;
          }
        }

        callback( null, resp );
      } );
      break;
  }
};
