import { keywords, classes } from './base';


// ===== Private methods =====
const convertWeather = (nodeList, weathers, temperature) => {

    // If the temperature is imperial
    if (temperature === keywords.farenheit) {

        // Loop over each weather node
        nodeList.forEach((e, index) => {

            // Get the weather rounded
            const weather = Math.round((weathers[index].result.main.temp * 1.8) + 32);

            // Add a animated class
            e.classList.add(classes.fadeInAnimation);

            // Add the new weather to the node
            e.innerHTML = `${weather}&deg;F`;

            // Remove the animation class after animation done
            setTimeout(() => {
                e.classList.remove(classes.fadeInAnimation);
            }, 400);
        });
    } else {
        nodeList.forEach((e, index) => {

            // Get the weather rounded
            const weatherFarenheit = Math.round((weathers[index].result.main.temp * 1.8) + 32);
            const weather = Math.round((weatherFarenheit - 32) / 1.8);

            // Add a animated class
            e.classList.add(classes.fadeInAnimation);

            // Add the new weather to the node
            e.innerHTML = `${weather}&deg;C`;

            // Remove the animation class after animation done
            setTimeout(() => {
                e.classList.remove(classes.fadeInAnimation);
            }, 400);
        });
    };
};

const renderWeather = (nodeList, weather, temperature) => {


    // If the temperature is imperial
    if (temperature === keywords.farenheit) {

        // Loop over the nodeList
        nodeList.forEach((e, index) => {
            // Add a animation class
            e.classList.add(classes.fadeInAnimation);

            // Render the new weather on the DOM
            e.innerHTML = `${weather[index].weather}&deg;F`;

            // Remove the animation class after animation done
            setTimeout(() => {
                e.classList.remove(classes.fadeInAnimation);
            }, 400);
        });
    } else {
        nodeList.forEach((e, index) => {

            // Add a animation class
            e.classList.add(classes.fadeInAnimation);

            // Render the new weather on the DOM
            e.innerHTML = `${weather[index].weather}&deg;C`;

            // Remove the animation class after animation done
            setTimeout(() => {
                e.classList.remove(classes.fadeInAnimation);
            }, 400);
        });
    };
};

const stateConvertF = (weather) => {

    // return the weather converted to imperial
    return Math.round((weather - 32) / 1.8);

};

const stateConvertC = (weather) => {

    // Return the weather converted to metric
    return Math.round((weather * 1.8) + 32);
};

// ===== Public methods =====


// DOM =====================================================
export const convertWeatherCards = (nodeList, weathers, temperature) => {
    // Convert the weather
    convertWeather(nodeList, weathers, temperature);

};

export const renderNewWeather = (nodeList, weathers, temperature) => {
    // Render the weather
    renderWeather(nodeList, weathers, temperature);

};

export const stateConvertWeather = (weather, unit) => {


    // Aux variable
    let result;

    // If the unit is metric
    if (unit === keywords.metric) {

        // Get the result in imperial
        result = stateConvertF(weather);
    } else {
        // If the unit is imperial

        // get the result in metric
        result = stateConvertC(weather);
    };

    // Return the new weather
    return result;

};