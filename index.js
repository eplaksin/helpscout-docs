'use strict';

var request = require('request');
var queryString = require('querystring');
var apiConfig = require('./api.json');

function HelpScoutDocs(apiKey) {

  if (!(this instanceof HelpScoutDocs)) { return new HelpScoutDocs(apiKey); }

  if (!apiKey) { throw new Error('Please provide Help Scout Docs API key!'); }

  // create endpoints objects and methods
  for (var section in apiConfig.endpoints) {
    this[section] = {};
    for (var method in apiConfig.endpoints[section]) {
      this[section][method] = function(reqParams){
        // bind default params (URI, HTTP request method) for each method
        return makeRequest.bind(null, reqParams);
      }(apiConfig.endpoints[section][method]);
    }
  }

  // unified function to perform API call
  function makeRequest(reqParams, data, callback) {

    reqParams = JSON.parse(JSON.stringify(reqParams));

    if (typeof data == 'function') {
      callback = data;
      data = {};
    } else if (typeof data == 'undefined' && typeof callback == 'undefined') {
      data = {};
      callback = function(){};
    }

    var id = data.id || null;
    var fields = data.fields || {};

    var requestOptions = {
      method: reqParams.method,
      auth: {
        username: apiKey,
        password: 'X'
      }
    };

    if (~reqParams.path.indexOf('{id}') && !id) {
      throw new Error('Please specify ID to call API: ' + reqParams.path);
    }

    reqParams.path = reqParams.path.replace('{id}', id);

    if (reqParams.method === 'GET' && Object.keys(fields).length) {
      reqParams.path += '?' + queryString.stringify(fields);
    }

    requestOptions.uri = apiConfig.domain + apiConfig.version + '/' + reqParams.path;

    if (reqParams.contentType == 'multipart/form-data') {
      fields.key = apiKey;
    }

    if (~['POST', 'PUT'].indexOf(reqParams.method)) {
      requestOptions.headers = {
        'Content-Type': reqParams.contentType || 'application/json'
      };
      requestOptions.body = JSON.stringify(fields);
    }

    request(requestOptions, function(err, response, body){
      if (err) {
        callback(err);
      } else {
        var data = {};
        try {
          data = JSON.parse(body);
        } catch(e) {
          data = {};
        }

        if (Math.round(response.statusCode / 100) === 2) {
          callback(null, data);
        } else {
          callback(data.error);
        }
      }
    });

  }

}

module.exports = HelpScoutDocs;
