'use strict';

var validator = require('html-validator');

var htmlValidator = {};

function cleanObsolete(dtos){
    var valueAux;
    var arrData = [];
    dtos.messages.forEach(function (currValue, currIndex) {
        valueAux = currValue.message.search(/obsolete/i);
        if(valueAux < 0)
            arrData.push(currValue);
    });
    return arrData;
}

htmlValidator['cleanObsolete'] = cleanObsolete;

(function() {
    
    var options = {
            format: 'json'
    };
    
    this.validate = function(fileData, callback) {
        options.data = fileData;
        validator(options, function(err, data){

            if(err) {
                return callback(null, '');
            }


            data.messages = cleanObsolete(data);


            return callback(null, data);
        });
    };

}).apply(htmlValidator)

module.exports = htmlValidator;


