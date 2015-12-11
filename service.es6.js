'use strict';

import R from 'ramda';
import randomizeArray from 'secret-santa-shuffler';
import fs from 'fs';
import path from 'path';

import mail from './modules/mail.es6';
import logger from './modules/logger.es6';
import templater from './modules/templater.es6';

const convertCsvToObj = R.compose(R.fromPairs, R.tail, R.map(R.compose(R.reverse, R.map(R.trim))), R.map(R.split(',')),R.split('\n'));
const getMails = R.compose(R.map(R.prop(0)),R.toPairs);
const prepeareForTemplater = originalList => {
  return R.compose(R.map(item => {
    item[1] = `${originalList[item[1]]} (${item[1]})`;
    return item;
  }));
}

var list = fs.readFileSync(path.resolve('./lists/list1.csv')).toString();
var mailingObject = convertCsvToObj(list);
var mailList = getMails(mailingObject);
var prepearedtForTemplater = prepeareForTemplater(mailingObject)(randomizeArray(mailList));

templater(prepearedtForTemplater, 'main').then(console.log).catch(console.log);

