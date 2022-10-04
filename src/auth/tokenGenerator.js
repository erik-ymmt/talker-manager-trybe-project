const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(8).toString('hex');

// referência https://nodejs.org/api/crypto.html#cryptorandombytessize-callback

module.exports = generateToken;
