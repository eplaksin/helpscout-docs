# helpscout-docs
HelpScout Docs API library for Node.js

## Installation
    $ npm install helpscout-docs

## Example
```javascript
var HelpScoutDocs = require('helpscout-docs');

var apiKey = '-- {your api key} --';
var hsdocs = new HelpScoutDocs(apiKey);

hsdocs.collections.getAll(function(err, result){
  console.log(result);
});
```
