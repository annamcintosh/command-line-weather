const weather = require('./weather');
const weatherMessage = process.argv.slice(2)

weather.get(weatherMessage);