const query = require ('./query')
const mutation = require ('./mutation')
const resolversMap = {...query, ...mutation }

module.exports = resolversMap;
