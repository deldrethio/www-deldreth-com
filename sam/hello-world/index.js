'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
  callback(null, "Hello, World~");  // Echo back the first key value
};