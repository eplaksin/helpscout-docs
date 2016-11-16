# helpscout-docs
[HelpScout Docs API](http://developer.helpscout.net/docs-api/) client for Node.js

## Installation
    $ npm install helpscout-docs

## Usage
```javascript
var HelpScoutDocs = require('helpscout-docs');

var apiKey = '{your api key}';
var hsdocs = new HelpScoutDocs(apiKey);

// get all collections
hsdocs.collections.getAll(function(err, result){
  console.log(result);
});
```
All available methods are listed [below](#api-documentation)

## API Documentation
After module initialization:
```javascript
var hsdocs = new HelpScoutDocs('{your api key}');
```
`hsdocs` object has following methods to perform API calls:
> **Notice**
> 
> All methods accept "error-first" callback function. In case of error, callback will be called with error message in first parameter, otherwise JSON result of API call will be passed as second parameter.
> 
> Some methods require data to pass. Provide object with data as first argument (see code examples).

### Articles

* List Articles
```javascript
hsdocs.articles.getAllByCollection({id:'{collectionId}'}, function(err, result){});
// or
hsdocs.articles.getAllByCategory({id:'{categoryId}'}, function(err, result){});
```

* Search Articles
```javascript
hsdocs.articles.search({
  fields:{
    query: 'query string'
  }
}, function(err, result){});
```

* List Related Articles
```javascript
hsdocs.articles.getRelated({id:'{articleId}'}, function(err, result){});
```

* List Revisions
```javascript
hsdocs.articles.getRevisions({id:'{articleId}'}, function(err, result){});
```

* Get Article
```javascript
hsdocs.articles.get({id:'{articleId or articleNumber}'}, function(err, result){});
```

* Get Revision
```javascript
hsdocs.articles.getRevision({id:'{revisionId}'}, function(err, result){});
```

* Create Article
```javascript
hsdocs.articles.create({
  fields:{
    collectionId: '{collectionId}',
    name: 'article name',
    text: 'article text'
  }
}, function(err, result){});
```

* Update Article
```javascript
hsdocs.articles.update({
  id: '{articleId}',
  fields:{
    name: 'article name',
    text: 'article text'
  }
}, function(err, result){});
```

* Upload Article
```javascript
hsdocs.articles.upload({
  fields:{
    collectionId: '{collectionId}',
    file: 'file data'
  }
}, function(err, result){});
```

* Update View Count
```javascript
hsdocs.articles.updateViewCount({
  id: 'articleId',
  fields:{
    count: 42
  }
}, function(err, result){});
```

* Delete Article
```javascript
hsdocs.articles.delete({id:'{articleId}'}, function(err, result){});
```

* Save Article Draft
```javascript
hsdocs.articles.saveDraft({
  id: 'articleId',
  fields:{
    text: 'article text'
  }
}, function(err, result){});
```

* Delete Article Draft
```javascript
hsdocs.articles.deleteDraft({id:'{articleId}'}, function(err, result){});
```

### Assets

* Create Article Asset
```javascript
hsdocs.assets.createArticleAsset({
  fields:{
    articleId: '{articleId}',
    assetType: 'attachment',
    file: 'file data'
  }
}, function(err, result){});
```

* Create Settings Asset
```javascript
hsdocs.assets.createSettingsAsset({
  fields:{
    assetType: 'favicon',
    file: 'file data'
  }
}, function(err, result){});
```

### Categories

* List Categories
```javascript
hsdocs.categories.getAllByCollection({id:'{collectionId}'}, function(err, result){});
```

* Get Category
```javascript
hsdocs.categories.get({id:'{categoryId or categoryNumber}'}, function(err, result){});
```

* Create Category
```javascript
hsdocs.categories.create({
  fields:{
    collectionId: '{collectionId}',
    name: 'category name'
  }
}, function(err, result){});
```

* Update Category
```javascript
hsdocs.categories.update({
  id: '{categoryId}',
  fields:{
    name: 'category name'
  }
}, function(err, result){});
```

* Update Category Order
```javascript
hsdocs.categories.updateOrder({
  id: '{collectionId}',
  fields:{
    categories: [
      {
        id: '{categoryId}',
        order: 1
      },
      {
        id: '{categoryId}',
        order: 2
      },
    }
  }
}, function(err, result){});
```

* Delete Category
```javascript
hsdocs.categories.delete({id:'{categoryId}'}, function(err, result){});
```

### Collections

* List Collections
```javascript
hsdocs.collections.getAll(function(err, result){});
```

* Get Collection
```javascript
hsdocs.collections.get({id:'{collectionId or collectionNumber}'}, function(err, result){});
```

* Create Collection
```javascript
hsdocs.collections.create({
  fields:{
    siteId: '{siteId}',
    name: 'collection name'
  }
}, function(err, result){});
```

* Update Collection
```javascript
hsdocs.collections.update({
  id: '{collectionId}',
  fields:{
    name: 'collection name'
  }
}, function(err, result){});
```

* Delete Collection
```javascript
hsdocs.collections.delete({id:'{collectionId}'}, function(err, result){});
```

### Redirects

* List Redirects
```javascript
hsdocs.redirects.getAllBySite({id:'{siteId}'}, function(err, result){});
```

* Get Redirect
```javascript
hsdocs.redirects.get({id:'{redirectId}'}, function(err, result){});
```

* Find Redirect
```javascript
hsdocs.redirects.find({
  fields: {
    url: '/some/path/123',
    siteId: '{siteId}'
  }
}, function(err, result){});
```

* Create Redirect
```javascript
hsdocs.redirects.create({
  fields:{
    siteId: '{siteId}',
    urlMapping: '/some/path/123',
    redirect: 'http://redirect.to/'
  }
}, function(err, result){});
```

* Update Redirect
```javascript
hsdocs.redirects.update({
  id: '{redirectId}',
  fields:{
    siteId: '{siteId}',
    urlMapping: '/some/path/123',
    redirect: 'http://redirect.to/'
  }
}, function(err, result){});
```

* Delete Redirect
```javascript
hsdocs.redirects.delete({id:'{redirectId}'}, function(err, result){});
```
  
### Sites

* List Sites
```javascript
hsdocs.sites.getAll(function(err, result){});
```

* Get Site
```javascript
hsdocs.sites.get({id:'{siteId}'}, function(err, result){});
```

* Create Site
```javascript
hsdocs.sites.create({
  fields:{
    subDomain: 'some-subdomain',
    title: 'site title'
  }
}, function(err, result){});
```

* Update Site
```javascript
hsdocs.sites.update({
  id: '{siteId}',
  fields:{
    subDomain: 'some-subdomain',
    title: 'site title'
  }
}, function(err, result){});
```

* Transfer Site
```javascript
hsdocs.sites.transfer({
  id: '{siteId}',
  fields:{
    destinationApiKey: '{another account Docs API key}'
  }
}, function(err, result){});
```

* Delete Site
```javascript
hsdocs.sites.delete({id:'{siteId}'}, function(err, result){});
```

See full Help Scout Docs API description on official website: [http://developer.helpscout.net/docs-api/](http://developer.helpscout.net/docs-api/)
