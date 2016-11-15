# helpscout-docs
[HelpScout Docs API](http://developer.helpscout.net/docs-api/) library for Node.js

## Installation
    $ npm install helpscout-docs

## Usage
```javascript
var HelpScoutDocs = require('helpscout-docs');

var apiKey = '-- {your api key} --';
var hsdocs = new HelpScoutDocs(apiKey);

// get all collections
hsdocs.collections.getAll(function(err, result){
  console.log(result);
});
```

## API Documentation
See full Docs API description on official website: [http://developer.helpscout.net/docs-api/](http://developer.helpscout.net/docs-api/)
Supported APIs:
* Articles
* Assets
* Categories
* Collections
* Redirects
* Sites
