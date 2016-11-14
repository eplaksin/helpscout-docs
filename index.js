'use strict';

var request = require('request');
var queryString = require('querystring');
var apiConfig = require('./api.json');

function HelpScoutDocs(apiKey) {

  if (!(this instanceof HelpScoutDocs)) { return new HelpScoutDocs(apiKey); }

  if (!apiKey) { throw new Error('Please provide Help Scout Docs API key!'); }

  for (var section in apiConfig.endpoints) {
    this[section] = {};
    for (var method in apiConfig.endpoints[section]) {
      this[section][method] = function(reqParams){
        return makeRequest.bind(null, reqParams);
      }(apiConfig.endpoints[section][method]);
    }
  }

  function makeRequest(reqParams, data, callback) {

    if (typeof data == 'function') {
      callback = data;
      data = {};
    } else if (typeof data == 'undefined' && typeof callback == 'undefined') {
      data = {};
      callback = function(){};
    }

    var requestOptions = {
      method: reqParams.method,
      auth: {
        username: apiKey,
        password: 'X'
      }
    };

    if (~reqParams.path.indexOf('{id}') && !data.id) {
      throw new Error('Please specify ID to call API: ' + reqParams.path);
    }

    reqParams.path = reqParams.path.replace('{id}', data.id);

    if (reqParams.method === 'GET' && data.fields) {
      reqParams.path += '?' + queryString.stringify(data.fields);
    }

    requestOptions.uri = apiConfig.domain + '/' + apiConfig.version + '/' + reqParams.path;

    if (~['POST', 'PUT'].indexOf(reqParams.method)) {
      requestOptions.headers = {'Content-Type': 'application/json'};
      requestOptions.body = JSON.stringify(data.fields || {});
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
