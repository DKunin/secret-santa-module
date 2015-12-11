# Secret Santa Module

## Installation

      npm i secret-santa-module -S

## Usage

      var santaModule = require('secret-santa-module');
      
      // Your MailGun Credentials
      var auth = {
        api_key: <YOUR API KEY>,
        domain: <YOUR DOMAIN>
      };

      santaModule('./list.csv', {auth:auth});

## List Example

      // NOTE : The first line is mandatory
      Name,e-mail
      Barry Allen,flash@dccomics.com
      Wally West ,kidflash@dccomics.com


## Sent message
  
  Вам предстоит осчастливить:
  Wally West (kidflash@dccomics.com)

## TODO 
- Custom templates