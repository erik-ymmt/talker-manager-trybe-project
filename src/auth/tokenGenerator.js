const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(8).toString('hex');

// referĂȘncia https://nodejs.org/api/crypto.html#cryptorandombytessize-callback

module.exports = generateToken;
