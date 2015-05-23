var crypto = require('crypto')

module.exports = function stringCrypt(string, password) {
  var hmac
    , signature

  hmac = crypto.createHmac('sha1', password)
  hmac.update(string)

  signature = hmac.digest('hex')
  return signature
}