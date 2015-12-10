'use strict';

let express     = require('express');
let app         = express();
let bodyParser  = require('body-parser');
let compression = require('compression');
import nconf from 'nconf';
import path from 'path';

nconf.argv()
     .file({ file: 'config/default.json' })
     .env();

const PORT      = nconf.get('PORT');

import mail from './mail.es6';
import logger from './logger.es6';
import templater from './templater.es6';
import {getListFull, 
        authorize, 
        getLists, 
        getParticipants, 
        createOrUpdateList, 
        createOrUpdateParticipant, 
        bulkAddParticipants,
        addParticipantToList,
        getShuffledPeople,
        removeParticipantFromList} from './db.es6';

app.use(compression());
app.use(express.static(path.resolve('./public')));
app.use('/temp', express.static(path.resolve('./temp')));
app.use(bodyParser.json());
app.set('view engine', 'jade');

app.get('/auth', (req, res) => authorize(req.query).then(result => res.json(result)));
app.get('/lists', (req, res) => getLists(req.query).then(result => res.json(result)));
app.post('/list', (req, res) => createOrUpdateList(req.body).then(result => res.json(result)));
app.post('/list/:id/add/:pid', (req, res) => addParticipantToList(req.params).then(result => res.json(result)));
app.get('/list/:id', (req, res) => getListFull(req.params).then(result=>res.json(result)));
app.get('/list/:id/randomize', (req, res) => getShuffledPeople(req.params).then(result => res.json(result)));
app.get('/list/:id/randomize/send', (req, res) => getShuffledPeople(req.params).then(result => {
  templater(result).then(mail);
  res.json(result);
}));
app.delete('/list/:id/remove/:pid', (req, res) => removeParticipantFromList(req.params).then(result=>res.json(result)));

app.get('/participants', (req, res) => getParticipants(req.query).then(result=>res.send(result)));
app.post('/participant', (req, res) => createOrUpdateParticipant(req.body).then(result=>res.send(result)));
app.post('/participants', (req, res) => bulkAddParticipants(req.body).then(result=>res.send(result)));

app.listen(PORT);

logger.info(`Running on ${PORT}`);