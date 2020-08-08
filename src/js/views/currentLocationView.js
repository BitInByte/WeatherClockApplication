import { elements, convertTimezone, renderTemperatureUnitSymbol, classes, ids } from './base';

// ===== Private methods =====
const updateTime = (timezone, id, intervals) => {

    // Set a new interval for the time
    const interval = setInterval(() => {

        // Render the new time
        document.querySelector(`#${id}`).innerHTML = convertTimezone(timezone);

    }, 1000);

    // Store the interval to the intervals state array
    intervals.push(interval);

};


const renderResult = (name, country, img, weather, timezone, temperatureUnit, intervals, id) => {

    // Create the currentLocationView markup
    const markup = `
            <div class="animate-fade-in">
                <h1 class="heading-primary">
                    ${name},
                </h1>
                <h2 class="heading-tertiary">
                    ${country}
                </h2>

                <img src="resources/img/weather-icons/${img}.svg" alt="" class="home-container__icon">

                <div class="home-container__weather" id="home-container__weather">
                    ${Math.round(weather)}&deg;${renderTemperatureUnitSymbol(temperatureUnit)}
                </div>

                <div class="home-container__time" id="home-container__clock">
                    ${updateTime(timezone, 'home-container__clock', intervals)}
                </div>
            </div>
     `;

    // Render the markup on the DOM
    document.querySelector(classes.currentLocation).insertAdjacentHTML('afterbegin', markup);

    // Render the time
    document.querySelector(ids.homeContainerClock).innerHTML = convertTimezone(timezone);
};

const renderFavWeather = (weather, temperatureUnit) => {

    // Check if the element is on the DOM
    if (document.querySelector(ids.homeContainerWeather)) {
        // Render the new weather
        document.querySelector(ids.homeContainerWeather).innerHTML = "";
        document.querySelector(ids.homeContainerWeather).insertAdjacentHTML('afterbegin', `<div class="animate-fade-in">${Math.round(weather)}&deg${renderTemperatureUnitSymbol(temperatureUnit)}</div>`);
    };
};



// ===== Public methods =====
// GETS =====================================================


// DOM =====================================================
// Clean the DOM
export const clearElements = () => document.querySelector(classes.currentLocation).innerHTML = '';

// Render results
export const renderResults = (data, weather, temperatureUnit, intervals) => {

    renderResult(data.name, data.sys.country, data.weather[0].icon, weather, data.timezone, temperatureUnit, intervals, data.id);
};

// Render converted weather
export const renderWeather = (weather, temperatureUnit) => renderFavWeather(weather, temperatureUnit);