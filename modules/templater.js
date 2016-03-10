'use strict';

var blueTemplate = require('blueimp-tmpl');
var DEFAULT_TEMPLATE = '<div>You should prepeare for <h3>{%=o.to%}</h3></div>';

module.exports = function templater(options, array) {
    var simpleTemplateFunction = blueTemplate(options.template ? options.template : DEFAULT_TEMPLATE);

    var processArrayToTemplates = array
        .map(function(object) {
            return { giver: object[0], to: object[1] };
        }).map(function(object) {
            return { giver: object.giver, string: simpleTemplateFunction(object) };
        });

    return new Promise(function(resolve, reject) {
        Promise.all(processArrayToTemplates).then(resolve).catch(reject);
    });
};
