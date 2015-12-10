'use strict';

import jade from 'jade';
import fs from 'fs';
import R from 'ramda';
import md5Hex from 'md5hex';
import nconf from 'nconf';
import currentIpAdress from 'my-ip';

nconf.argv()
     .file({ file: 'config/default.json' })
     .env();

const PORT         = nconf.get('PORT');
const SERVERADRESS = `http://${currentIpAdress()}:${PORT}`;
// Compile a function

let link = jade.compileFile('templates/link.jade', {});
const prepeareArray = R.map(item=>{return { giver:item[0], to:item[1] };});
const buildFilename = function(obj) {
  return `temp/${md5Hex(obj, 12)}.html`;
};

let fspromise = function(obj){
  return new Promise(function(resolve,reject) {
    let filename = buildFilename(obj.string);
    let data     = obj.string+link({link:filename, server: SERVERADRESS});
    fs.writeFile(filename, data, result=>{
      if(result) {return reject(result);} return resolve({filelink: filename, string: data, giver: obj.giver});
    });
  });
};

function templater(array, templatename='main'){
  let fn = jade.compileFile(`templates/${templatename}.jade`, {});
  let processJadeWithOriginal = function(ob){ return {giver: ob.giver, string: fn(ob)};};
  let newArray = R.compose(R.map(fspromise), R.map(processJadeWithOriginal), prepeareArray)(array);
  return new Promise(function(resolve, reject){
    Promise.all(newArray).then(resolve).catch(reject);
  });
}



export default templater;