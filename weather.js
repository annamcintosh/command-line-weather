// api key = 0d75b4a04f22aa793d8507e33974e66f
// api.openweathermap.org/data/2.5/weather?zip={zip code},us&appid=0d75b4a04f22aa793d8507e33974e66f
//response.name
//response.main.temp

const https = require('https');
const http = require('http');

// Print error message
function printError(error) {
    console.error(error.message);
}

//function to print message to console
function printMessage(zipcode, temperature, name) {
    const message = `It is ${temperature} degrees in ${zipcode} (${name}).`;
    console.log(message);
}

function get(zipcode) {
    try {
        // Connect to the API url ()
        const request = https.get(`api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&appid=0d75b4a04f22aa793d8507e33974e66f`, response => {
            if (response.statusCode === 200) {
            let body = ""
            // Read the data
            response.on('data', data => {
                body += data.toString();
            });

            response.on('end', () => {
                try {
                    // Parse the data   
                    const profile = JSON.parse(body); 
                    // Print the data  
                    printMessage();
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