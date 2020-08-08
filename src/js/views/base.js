// DOM elements
export const elements = {

    temperatureUnitBtn: document.querySelector('.temperature-unit__checkbox'),

    searchBox: document.querySelector('.add-new-container'),
    searchInput: document.querySelector('.form__input'),
    searchContainer: document.querySelector('.add-new-container__items'),
    cardsSection: document.querySelector('.section-wrapper'),

    currentLocationContainer: document.querySelector('.home-container--current-location'),
    favoriteContainer: document.querySelector('.home-container--favorite'),
};

export const classes = {

    temperatureUnitBtn: 'temperature-unit__checkbox',
    darkModeBtn: 'dark-mode__checkbox',
    loader: 'loader',

    // Sections
    sectionWrapper: '.section-wrapper',
    sectionControls: '.section-controls',

    // Containers
    currentLocation: '.home-container--current-location',
    favorite: '.home-container--favorite',
    forecast: '.forecast-container__weather',
    forecastWrapper: '.forecast-container',
    addNew: '.add-new-container__items',
    addNewBox: '.add-new-container__box',
    countryGroup: '.country-group__wrapper',

    // Groups
    countryWeatherGroup: '.country-group__weather',

    // Elements
    addNewClose: '.add-new-container__close',
    addNewBoxTitle: '.add-new-container__box-title',
    addNewBoxForm: '.add-new-container__box-form',

    // Animations 
    addNewConatinerShowAnimation: 'add-new-container__show',
    addNewContainerHideAnimation: 'add-new-container__hide',
    addNewBoxAnimation: 'add-new-container__box--animate',
    addNewCloseAnimation: 'add-new-container__close--animate',
    addNewBoxTitleAnimation: 'add-new-container__box-title--animate',
    addNewBoxFormAnimation: 'add-new-container__box-form--animate',
    fadeInAnimation: 'animate-fade-in',

};

export const ids = {
    weathers: '#item-container__weather',
    homeContainerClock: '#home-container__clock',
    homeContainerWeather: '#home-container__weather',
    favWeather: '#fav-weather',
    checkedTemperature: 'checkbox-temperature',
};

export const links = {
    addNewContainer: 'add-new-container__link',
    itemContainerAddNew: 'item-container__add-new-link',
    addNewContainerClose: 'add-new-container__close-link',
    itemContainerFav: 'item-container__fav-link',
    itemContainerDel: 'item-container__del-link',
    countryGroup: 'country-group__link',
    countryContainerClose: 'country-container__close-link',

};

export const keywords = {

    metric: 'metric',
    farenheit: 'imperial',
};

// Get time based in timezone
export const convertTimezone = (timezone) => {
    var d = new Date();
    var n = d.toUTCString();

    const gmt = n.split(" ");

    const gmtTime = gmt.reverse()[1].split(":");

    gmtTime[0] = (((parseInt(gmtTime[0]) * 3600) + timezone) / 3600);

    if (gmtTime[0] > 24) {
        gmtTime[0] -= 24;
    }
    gmtTime[0].toString();

    return gmtTime.join(':');

};

// Get the temperature unit
export const renderTemperatureUnitSymbol = (temperatureUnit) => {
    // Return a string depending on the temperature unit
    if (temperatureUnit === 'metric') {
        return 'C';
    } else {
        return 'F';
    };
};

// Render new weather with nodeList
export const renderWeathers = (nodeList, weather, temperature) => {
    if (temperature === keywords.farenheit) {
        nodeList.forEach((e, index) => {

            e.classList.add('animate-fade-in');
            e.innerHTML = `${weather[index].main.temp}&deg;F`;
            setTimeout(() => {
                e.classList.remove('animate-fade-in');
            }, 400);
        });
    } else {
        nodeList.forEach((e, index) => {


            e.classList.add('animate-fade-in');
            e.innerHTML = `${weather[index].main.temp}&deg;C`;
            setTimeout(() => {
                e.classList.remove('animate-fade-in');
            }, 400);
        });
    };
};

export const renderLoader = (parent) => {
    // Parent is the child element on where we want to implement the loader
    const loader = `
        <div class="${classes.loader}">
            <div class="${classes.loader}__item ${classes.loader}--1"></div>
            <div class="${classes.loader}__item ${classes.loader}--2"></div>
            <div class="${classes.loader}__item ${classes.loader}--3"></div>
            <div class="${classes.loader}__item ${classes.loader}--4"></div>
            <div class="${classes.loader}__item ${classes.loader}--5"></div>
        </div>
      `;
    parent.insertAdjacentHTML("afterbegin", loader);
};