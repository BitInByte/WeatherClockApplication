import { elements, convertTimezone, renderTemperatureUnitSymbol, classes, ids } from './base';

const updateTime = (timezone, id, intervals) => {


    // Get the element from the DOM
    const element = document.getElementById(`${id}`);

    // Set a Interval, storing it in a variable to be stoped after the element got removed from the DOM
    const interval = setInterval(() => {


        // Check if the element is still on the DOM
        if (element.parentNode.parentNode) {
            // If the element is on the DOM render the new time 
            document.querySelector(`#${id}`).innerHTML = convertTimezone(timezone);
        } else {

            // If the element is not on the DOM, stops the Interval loop
            clearInterval(interval);

        };
    }, 1000);

    // Store the interval reference on the state intervals array
    intervals.push(interval);

};

const renderResult = (name, country, img, weather, timezone, id, temperatureUnit, intervals) => {


    // Build the markup
    const markup = `
        <div class="animate-fade-in">
            <h1 class="heading-primary">
                ${name},
            </h1>
            <h2 class="heading-tertiary">
                ${country}
            </h2>

            <img src="resources/img/weather-icons/${img}.svg" alt="" class="home-container__icon">

            <div class="home-container__weather" id="fav-weather">
                ${Math.round(weather)}&deg;${renderTemperatureUnitSymbol(temperatureUnit)}
            </div>

            <div class="home-container__time" id="favorite__clock-${id}">
                
            </div>
        </div>
     `;


    // Render the new markup on the DOM
    document.querySelector(classes.favorite).insertAdjacentHTML('afterbegin', markup);

    // Render the clock
    document.querySelector(`#favorite__clock-${id}`).innerHTML = convertTimezone(timezone);
    updateTime(timezone, `favorite__clock-${id}`, intervals);
};

const renderFavWeather = (weather, temperatureUnit) => {

    // Check if the element is on the DOM
    if (document.querySelector(ids.favWeather)) {

        // Render the new weather
        document.querySelector(ids.favWeather).innerHTML = "";
        document.querySelector(ids.favWeather).insertAdjacentHTML('afterbegin', `<div class="animate-fade-in">${Math.round(weather)}&deg${renderTemperatureUnitSymbol(temperatureUnit)}</div>`);
    };
};

// ===== Public methods =====


// DOM =====================================================
// Clean the DOM
export const clearElements = () => {
    // elements.favoriteContainer.innerHTML = ''
    document.querySelector(classes.favorite).innerHTML = ''
    clearInterval();
};

// Render the results on the DOM
export const renderResults = (data, temperatureUnit, intervals) => renderResult(data.name, data.country, data.icon, data.weather, data.timezone, data.id, temperatureUnit, intervals);

// Render the new converted weather
export const renderWeather = (weather, temperatureUnit) => renderFavWeather(weather, temperatureUnit);