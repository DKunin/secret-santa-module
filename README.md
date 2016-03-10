# Secret Santa Module

## Installation

      npm i secret-santa-module -S

## Usage
```javascript
  var fs = require('fs');
  var path = require('path');
  var list = fs.readFileSync(path.resolve('./test-list.csv')).toString();
  var santaModule = require('secret-santa-module');
  
  // Your MailGun Credentials
  var auth = {
    api_key: <YOUR API KEY>,
    domain: <YOUR DOMAIN>
  };

  santaModule(list, {
      auth: auth,
      debug: false,
      template: '<div><h2>Custom template!</h2><div>You should prepeare for <h3>{%=o.to%}</h3></div></div>'
  });
```
## List Example

      // NOTE : The first line is mandatory
      Name,e-mail
      Barry Allen,flash@dccomics.com
      Wally West ,kidflash@dccomics.com

## Sent message
  
  You should prepare a present for:
  Wally West (kidflash@dccomics.com)

## Changelog

### 3.2.0
- Breaking changes: replaced jade templater for simple string templater
- Breaking changes: removed jade
- Breaking changes: removed ramda

### 3.0.0
- Breaking changes: you should provide csv string instead of a filename
- You can provide custom template option jade string

## TODO 
- ~~Custom templates~~
- Templates without jade or Automatic conversation from HTML to jade