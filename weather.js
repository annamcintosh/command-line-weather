// api.openweathermap.org/data/2.5/weather?zip={zip code},us&appid=0d75b4a04f22aa793d8507e33974e66f
//response.name
//response.main.temp
const api = require('./api.json')
const https = require('https');
const http = require('http');

// Print error message
function printError(error) {
    console.error(error.message);
}

//function to print message to console
function printWeather(zipcode, temperature, name) {
    const message = `It is ${temperature} degrees fahrenheit in ${zipcode} (${name}).`;
    console.log(message);
}

function get(zipcode) {
    try {
        const request = https.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&appid=${api.key}`, response => {
            if (response.statusCode === 200) {
            let body = ""
            response.on('data', data => {
                body += data;
            });

            response.on('end', () => {
                try {
                    const weather = JSON.parse(body); 
                    printWeather(zipcode, weather.main.temp, weather.name);
                } catch (error) {
                    printError(error);
                }
            });
        } else {
            const message = `There was an error getting the weather information for ${zipcode} (${http.STATUS_CODES[response.statusCode]})`;
            const statusCodeError = new Error(message);
            printError(statusCodeError);
        }
            request.on('error', printError);

            })
    } catch (error) {
        printError(error);
    }
}

module.exports.get = get;