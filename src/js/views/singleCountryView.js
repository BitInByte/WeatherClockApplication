import { elements, convertTimezone, renderTemperatureUnitSymbol, classes } from './base';

// ===== Private methods =====
const renderLayout = (city) => {

    // Build the new markup
    const markup = `
        <section class="country-container animate-fade-in">

        <div class="country-container__close">
            <a href="#" class="country-container__close-link">
                <ion-icon name="close" class="country-container__close-icon"></ion-icon>
            </a>
        </div>

        <div class="country-group">

            <div class="country-group__title">
                <h2 class="heading-primary">
                    ${city}
                </h2> 
            </div>

            <div class="country-group__wrapper">

            </div>

        </div>       
        
        <div class="forecast-container">

        </div>

    </section>
    `;

    // Render the new markup
    document.querySelector('main').insertAdjacentHTML('afterbegin', markup);
};

const renderDays = (date, weather, icon, id, temperatureUnit) => {

    // Build the new markup
    const markup = `
    
            <a class="country-group__link" data-id="${id}">
                <div class="country-group__today">
                    
                        <div class="country-group__today-container">
                            <h2 class="heading-secondary">
                                ${date}
                            </h2>

                            <img src="resources/img/weather-icons/${icon}.svg" alt="${weather}" class="country-group__icon" />

                            <div class="country-group__weather">
                                ${Math.round(weather)}&deg;${renderTemperatureUnitSymbol(temperatureUnit)}
                            </div>
                        </div>
                    
                </div>
            </a>
    
    `;

    // Render the new markup
    document.querySelector(classes.countryGroup).insertAdjacentHTML('beforeend', markup);
};

const renderForecast = (date, weather, icon, temperatureUnit) => {

    // Build the new markup
    const markup = `
        <div class="forecast-container__item animate-fade-in">

            <h2 class="forecast-container__day heading-secondary">
                ${date}
            </h2>

            <div class="forecast-container__information">
                <img src="resources/img/weather-icons/${icon}.svg" alt="${weather}" class="forecast-container__icon" />
                <div class="forecast-container__weather">
                    ${Math.round(weather)}&deg;${renderTemperatureUnitSymbol(temperatureUnit)}
                </div>
            </div>
        </div>
    `;

    // Render the new markup
    document.querySelector(classes.forecastWrapper).insertAdjacentHTML('beforeend', markup);
};

// Clean the forecast Results from the DOM
const cleanForecastResults = () => document.querySelector(classes.forecastWrapper).innerHTML = '';

// ===== Private methods =====
export const weekArrayConstructor = (weeks) => {

    // Create a new variable with the weather of now
    const now = weeks[0][0][0].dt_txt.split(' ')[1];

    // Create an aux array
    const weekArray = [];

    // Convert all the weeks into day cards array
    weeks.map(e => {
        e.map(el => {
            el.map(elem => {
                if (elem.dt_txt.split(' ')[1] === now) weekArray.push(elem);
            });
        });
    });

    return weekArray;
};



export const renderSingleCountry = (weeks, name, temperatureUnit) => {

    // Call the render Layout
    renderLayout(name);

    // Cerate a new array with the weather orginised by days
    const weekArray = weekArrayConstructor(weeks);

    // Loop over the weekArray 
    weekArray.map((e, index) => {
        // Render the days weathers
        renderDays(e.dt_txt.split(' ')[0], e.main.temp, e.weather[0].icon, index, temperatureUnit);
    });

};

export const renderForecasts = (day, temperatureUnit) => {

    // Clean results
    cleanForecastResults();

    // Render results
    day.map(e => {
        // Render the day forecast
        renderForecast(e.dt_txt, e.main.temp, e.weather[0].icon, temperatureUnit);
    });
};
