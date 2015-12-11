'use strict';

import R from 'ramda';
import jade from 'jade';

const prepeareArray = R.map(item=>{return { giver:item[0], to:item[1] };});
const fn = jade.compileFile(`templates/main.jade`, {});
const processJadeWithOriginal = ob => ({giver: ob.giver, string: fn(ob)});
const processArrayToTemplates = R.compose(R.map(processJadeWithOriginal), prepeareArray);

function templater(array){
  return new Promise(function(resolve, reject){
    Promise.all(processArrayToTemplates(array)).then(resolve).catch(reject);
  });
}



export default templater;