var stringCrypt = require('..')

describe('string-crypt', function () {

  it('should correctly encrpyt a string ', function () {
    var encrpytedString = stringCrypt('hello', 'mySecretKey')
    encrpytedString.should.equal('7372493cd3e2b8ecb668879af45496d539559731')
  })

})