var CryptoJS = require('../vendor/cryptojs/crypto');

// Add SHA3 to strings
String.prototype.sha3 = function(length, encoding) {
  
  length = length || 512;
  encoding = encoding || 'hex';

  var _validLengths = [224, 256, 384, 512],
      _validEncoding = ['latin1', 'hex', 'base64'];

  // Length of hash
  if (typeof length !== 'number') {
    throw Error('Please give the length as a number');
  }
  if (_validLengths.indexOf(length) == -1) {
    throw Error('Hash length can only be ' + _validLengths.join(', ') + ' bits long');
  }

  // Encoding of hash
  if (typeof encoding !== 'string') {
    throw Error('Encoding must be a string');
  }

  if (_validEncoding.indexOf(encoding.toLowerCase()) == -1) {
    throw Error('Can only encode in the following formats: ' + _validEncoding.join(', ').trim());
  }

  return String(CryptoJS.SHA3(this.toString(), {outputLength: length}).toString(CryptoJS.enc[encoding.capitalize()]));
};

// Add MD5
String.prototype.md5 = function() {
  return String(CryptoJS.MD5(this.toString()).toString());
};

// Ciphers
var _validCiphers = {
  'aes': CryptoJS.AES,
  'tripledes': CryptoJS.TripleDES,
  'rabbit': CryptoJS.Rabbit,
  'rc4drop': CryptoJS.RC4Drop
};

// Verify encrypt and decrypt parameters are valid
function verifyForEncryption(passphrase, cipher) {
  if (typeof passphrase !== 'string') {
    return 'Passphrase must be a string';
  }

  if (cipher) {
    if (cipher && typeof cipher !== 'string') {
      return 'Cipher must be a string';
    }
    
    if (Object.keys(_validCiphers).indexOf(cipher.toLowerCase()) == -1) {
      return 'Invalid cipher given. Can only use the following ciphers:' + Object.keys(_validCiphers).join(', ');
    }
  }

  return false;
}

// Encrypt
String.prototype.encrypt = function(passphrase, cipher) {
  
  var err = verifyForEncryption(passphrase, cipher);
  if (err) {
    throw Error(err);
  }
  
  cipher = cipher || 'aes';

  return String(_validCiphers[cipher].encrypt(this.toString(), passphrase).toString());
};

// Decrypt
String.prototype.decrypt = function(passphrase, cipher) {

  var err = verifyForEncryption(passphrase, cipher);
  if (err) {
    throw Error(err);
  }
  
  cipher = cipher || 'aes';
  try {
    return String(_validCiphers[cipher].decrypt(this.toString(), passphrase).toString(CryptoJS.enc.Utf8));
  } catch (e) {
    return '';
  }
  
};