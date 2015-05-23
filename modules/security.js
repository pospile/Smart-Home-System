var log = require('./log');
var Parse = require('parse').Parse;
var User = require('./user');
require('utils-strings');


Parse.initialize("OZzaxhboZwBA0LKHSW8TWWjyKUQNde6n7D7Ie8Ue", "ZNk19fV7khFmfEpQ2yZurDGyectCQw2nK5rHhH7d");



/*
var crypt = 'pospile'.encrypt('reinolde@seznam.cz');
console.log(crypt);
console.log('Decrypting username');
console.log(crypt.decrypt('reinolde@seznam.cz'));
*/






/*

    EXPORT ZONE BELOW

 */

exports.createUser = function (username, password, email, callback) {
    token = username.encrypt(email);
    User.createUser(token, username, password, email, function(data) {
        callback(data);
    });
}

exports.generateSecretToken = function (username, password, callback) {
    User.logInUser(username, password, function (data) {
        newToken = username.encrypt(data._serverData.email);
        callback({"token": newToken});
    });
}