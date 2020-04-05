// Return config according to env
module.exports = require(`./${process.env.NODE_ENV}.env.js`);