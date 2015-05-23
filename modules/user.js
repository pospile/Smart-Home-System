var log = require('./log');
var Parse = require('parse').Parse;


Parse.initialize("OZzaxhboZwBA0LKHSW8TWWjyKUQNde6n7D7Ie8Ue", "ZNk19fV7khFmfEpQ2yZurDGyectCQw2nK5rHhH7d");


var user = new Parse.User();





var CreateUserAccount = function (token, username, password, email, callback) 
{
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    user.set("token", token);

    user.signUp(null, 
    {
        success: function(user) {
            callback({success: true});
        },
        error: function(user, error) {
            callback({success: false});
        }
    });
}

var LogIn = function  (username, password, callback) {
    
    try{
        Parse.User.logIn(username, password, {
            success: function(user) {
                callback(user);
            },
            error: function(user, error) {
                console.log('error pass or name');
                callback(error);
            }
        });
    }
    catch (error){
        console.log('error');
    }    
}

var ReturnUsers = function (callback) {
    
    var query = new Parse.Query(Parse.User);
    query.find({
      success: function(data) {
        callback(data);
      }
    });

}


/*


        EXPORTS ZONE BELOW


*/

exports.createUser = function (token, username, password, email, callback) {
    CreateUserAccount(token, username, password, email, function (data) {
        callback(data);
    })
}

exports.logInUser = function (username, password, callback) {
    LogIn(username, password, function (data) {
        callback(data);
    })
}

exports.returnUser = function (callback) {
    ReturnUsers(function (data) {
        callback(data);
    });
}

