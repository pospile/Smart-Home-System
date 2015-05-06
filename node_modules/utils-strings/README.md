utils-strings
=============
[![Build Status](https://travis-ci.org/fdvj/utils-strings.svg?branch=master)](https://travis-ci.org/fdvj/utils-strings)

This library extends the available methods in strings. It is a collection of utilities. The idea is to provide simple modifiers to strings that replace separate helper functions we usually write to provide the same functionality. So, instead of writing for example a capitalize function, you can simply use the extended capitalize method available in the string:

Example
-------

Instead of doing this:

```javascript
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var myString = 'john';
capitalize(myString);
// returns 'John'
```

you can simply do this

```javascript
'john'.capitalize();
// returns 'John'
```

And it gets more useful when complex modifiers are needed, for example encrypting a string. Again, it will simply be a matter of calling the extended encrypt method:

```javascript
'john doe'.encrypt('secret keyphrase');
// returns 'U2FsdGVkX1/WgbK3YTsww1+2Xd3HBtXiluAcKo6J/+M='

'U2FsdGVkX1/WgbK3YTsww1+2Xd3HBtXiluAcKo6J/+M='.decrypt('secret keyphrase');
// returns 'john doe'
```
Usage
-----

To use the library, simply require the library. No need to assign it to a variable as it will prototype the String class.

```javascript
require('utils-strings');
```

General Methods
--------------

This library contains several string methods, which are shown below

#### capitalize()

Returns the string with the first letter in uppercase.

```javascript
var text = "john";
text.capitalize(); // returns "John"
"doe".capitalize(); // returns "Doe"
```

#### camelcase()

Returns the string on camelcase format, meaning the first letter will be uppercase, spaces and underscores will be trimmed and the first letter after them will be capitalized.

```javascript
var text = "john doe";
text.camelcase(); // returns "JohnDoe"
"john doe".camelcase(); // returns "JohnDoe"
"john_doe".camelcase(); // returns "JohnDoe"
```

Encryption and Hashing
----------------------

Along with utility string methods, this library extends strings by providing them with hashing and encryption methods, based on [CryptoJS](https://code.google.com/p/crypto-js/). The available methods are shown below.

### Hashing Methods

Hash are one-way coding of strings.  Once a string is hashed, technically its content cannot be reproduced back.  Hashes are using for storing passwords in a database, creating checksums, etc.

#### md5()

MD5 is a widely used hashing function. It is used in many security applications and especially for checking the integrity of files and messages via checksums. However, it is not completely safe, and therefore is not used in applicaitons which require a higher level of security.

```javascript
var text = "john doe";
text.md5(); // returns "320b8e6bef45211f0f57b618925f4193"
"john doe".md5() // returns "320b8e6bef45211f0f57b618925f4193"
```

#### sha3( [length, encoding] )

The sha3 method provides a cryptographic algorithm that returns hashes in 4 different lenghts which you can specify by sending a *number* as the length. The available lengths are: **224**, **256**, **384**, and **512**.  If no arguments are given to the method, it will use 512-bit length as default. If no encoding argument is given, it will return a hexadecimal hash. You can specify one of three encoding types: **hex**, **latin1**, and **base64**.

```javascript
var text = "john doe";
// Without arguments
text.sha3(); // returns "50ad331798a9f12cfa74e52b3b496..."

// With bit length as argument
text.sha3(224); // returns "765f030f3ca2b243d52f6c3d891d..."
text.sha3(256); // returns "c02e103ac14f890092664e93fb2b9..."
text.sha3(384); // returns "199ea73dd4a7efc2731b98a528ef2..."
text.sha3(512); // returns "50ad331798a9f12cfa74e52b3b496..."

// With bit length and encoding as argument
text.sha3(256, 'latin1'); // returns "À.:ÁOfNû+¹¹X 4¨"·*ÜK0mê"
text.sha3(256, 'base64'); // returns  "wC4QOsFPiQCSZk6T+yufgbm5WAk0qCKYtyrcSzCIbeo="
text.sha3(256, 'hex'); // returns "c02e103ac14f890092664e93fb2b9..."
```

### Encryption Methods

Encryption of data is something we definitely need in our applications these days. For passwords we usually use a hash like MD5 or SHA3 to store it, instead of leaving it on plain text for the world to see. If someone steals it, at least he/she won't know our user's password. However there are times in which our application needs a way to get back the data. We need to be able to protect the data, as in a hash, and then be able to get the original data back. And most of the time, this data is in text format, so it seems natural we could have a method in a string to encrypt and decrypt the string with ease.

#### encrypt(passphrase [, cipher])

The encrypt method allows us to easily encrypt a string by just passing a password or passphrase. You can even hash the passphrase to make it more difficult to decipher.You can start encrypting by simply passing a passphrase to the string.

```javascript
var text = "john doe";
text.encrypt("my secret key"); // returns "320b8e6bef45211f0f57b618925f4193"
"john doe".encrypt("my secret passphrase") // returns "320b8e6bef45211f0f57b618925f4193"
```

By default, the encrypt method will use an AES cipher algorithm to encrypt the data and will return the data as a string encoded in Base64 format.  However, you can change the cipher by sending a second argument specifying the cipher you wish to use. The available ciphers are: **AES**, **TripleDES**, **Rabbit**, and **RC4Drop**.

```javascript
var text = "john doe";
text.encrypt("my secret key", 'aes'); 
// returns "U2FsdGVkX19k7IgcoiRX38s+exjBeCD2ao6EyhWXlK8="

text.encrypt("my secret key", 'tripledes'); 
// returns "U2FsdGVkX18Hykc/Gxa2TonwrOOfkw4ohA0g/vbr8Ww="

text.encrypt("my secret key", 'rabbit'); 
// returns "U2FsdGVkX1++5/JI3DzqebS+pT3bEyuz"


text.encrypt("my secret key", 'rc4drop'); 
// returns "U2FsdGVkX18yvxf+rH0XWIBNk7YmJHmG"
```

Please note ciphers use time for calculations. Therefore, running the encrypt method on a same text will most likely return different values (although the encrypted data is still the same). For additional documentation on the ciphers, please read the documentation in [CryptoJS](https://code.google.com/p/crypto-js/).

#### decrypt(passphrase [, cipher])

The decrypt method will allow you to recover the original data of an encrypted string.  It will return the data in UTF-8. Please note that to successfully decrypt a string, you must provide the correct passphrase or password, and the cipher used to encrypt the data.  If any of these are incorrect, it will return an empty string. The available decryption ciphers are: **AES**, **TripleDES**, **Rabbit**, and **RC4Drop**.
```javascript
// The string below was encrypted using AES
var encrypted = "U2FsdGVkX19k7IgcoiRX38s+exjBeCD2ao6EyhWXlK8=";
encrypted.decrypt("my secret key"); 
// returns 'john doe'
encrypted.decrypt("my secret key", 'aes');
// returns 'john doe';

encrypted.decrypt("invalid key", 'aes');
// returns ''

encrypted.decrypt("my secret key", 'tripledes');
// returns ''

var encrypted_tripledes = "U2FsdGVkX18Hykc/Gxa2TonwrOOfkw4ohA0g/vbr8Ww=";
encrypted_tripledes.decrypt('my secret key', 'tripledes');
// returns 'john doe'

var encrypted_rabbit = "U2FsdGVkX1++5/JI3DzqebS+pT3bEyuz";
encrypted_rabbit.decrypt('my secret key', 'rabbit');
// returns 'john doe'

var encrypted_rc4drop = "U2FsdGVkX18yvxf+rH0XWIBNk7YmJHmG";
encrypted_rc4drop.decrypt('my secret key', 'rc4drop');
// returns 'john doe'
```

Contributions
-------------

If you wish to contribute to this project, please feel free to do so. There are many functions we usually rewrite when dealing with strings which we can simply add to the string prototype itself, and simplify that way our code. If you find an issue, please open up a ticket. If you want to contribute, just submit a pull request to the repository and I'll look into it, and most likely merge it. The aim is to make this library a string utility belt.