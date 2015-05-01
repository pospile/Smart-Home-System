var log = require('./log');
var Parse = require('parse').Parse;
Parse.initialize("OZzaxhboZwBA0LKHSW8TWWjyKUQNde6n7D7Ie8Ue", "ZNk19fV7khFmfEpQ2yZurDGyectCQw2nK5rHhH7d");

var user = new Parse.User();









var createUser = function () {
    
}

var generateSecret = function () {

}



/*

    EXPORT ZONE BELOW

 */

exports.createUser = function (token, username, password, email, callback) {
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    user.set("device", token);

    user.signUp(null, {
        success: function(user) {
            callback({success: true});
        },
        error: function(user, error) {
            callback({success: false});
        }
    });

}

exports.generateSecretToken = function (username, password, callback) {
    
}