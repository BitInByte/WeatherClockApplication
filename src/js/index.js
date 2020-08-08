// * Import Classes
import Search from './models/Search';
import Cards from './models/Cards';
import CurrentLocation from './models/CurrentLocation';
import Favorite from './models/Favorite';
import SingleCountry from './models/SingleCountry';
import Dark from './models/Dark';

// * Import Views
import * as searchView from './views/searchView';
import * as cardsView from './views/cardsView';
import * as currentLocationView from './views/currentLocationView';
import * as favoriteView from './views/favoriteView';
import * as temperatureUnitView from './views/temperatureUnitView';
import * as singleCountryView from './views/singleCountryView';
import * as homeView from './views/homeView';
import * as controllsView from './views/controllsView';

// * Import elements
import { elements, classes, renderWeathers, renderLoader, ids, links } from './views/base';

require('../sass/main.scss');

// Declaring the state
const state = {
    temperatureUnit: 'metric',
    intervals: [],
};

// Debbuging the state
// window.state = state;

const init = async () => {

    // Create the Dark state
    state.dark = new Dark();

    // Create the cards state
    state.cards = new Cards();

    // Create the favorite state
    state.favorite = new Favorite();

    // Read data from the local storage
    state.dark.readStorage();

    // Read temperature unit from local storage
    const temp = JSON.parse(localStorage.getItem("temperatureUnit"));

    // Check if browser supports geolocation API
    if (navigator.geolocation) {

        // Call the controllerCurrentLocation
        controllerCurrentLocation();
    };


    // If is there any data on the local storage
    if (temp) {
        state.temperatureUnit = temp;
    };

    // Change the colors to dark if it's true
    if (state.dark.darkMode === true) {
        document.querySelector('body').classList.add('dark');
    };


    try {

        // Render Loader
        renderLoader(document.querySelector(classes.sectionWrapper));

        // Read data from the local storage
        await state.cards.readStorage(state.temperatureUnit);

        // Clear the loader   
        cardsView.clearElements();

        // Render the cards got from the local storage
        cardsView.renderResults(state.cards, state.temperatureUnit, state.intervals);
    } catch (error) {
        console.log(error);
    };



    // Check if localStorage had a value stored
    if (state.cards.cards.length > 0) {

        // Read the favorite data from the localStorage
        state.favorite.readStorage();

        if (state.favorite.id) {

            // get the country object
            const favoriteObject = state.cards.cards.find(e => e.data.id == state.favorite.id);

            // call the controller
            controllerFavorite(favoriteObject, state.favorite.id);
        };
    };

    // Render the buttons after everything being rendered on the dom
    controllsView.renderControlls();

    // Toggle dark mode
    if (state.dark.darkMode === true) {
        // Toggle the dark mode switch
        document.getElementById('checkbox').checked = true;
    };

    // If the temperatureUnit on the state is imperial
    if (state.temperatureUnit === 'imperial') {
        // Toggle the temperature switch
        document.getElementById(ids.checkedTemperature).checked = true;
    };

};




const controllerSearch = async () => {

    // Get the use input from the form
    const query = searchView.getInput();

    // Check if the user input something
    if (query) {

        // Clean the results to render the load
        searchView.clearElements();

        // Render the load
        renderLoader(elements.searchContainer);

        // Create a new Search object
        state.search = new Search(query);

        // Clean the input
        searchView.clearInput();

        try {
            // Async calling the class method getSeach from class Search - get the results from the API
            if (state.cards) {
                await state.search.getSearch(state.cards.cards);
            } else {
                await state.search.getSearch();

            }

            // Clean the loader
            searchView.clearElements();

            // Render the results on the DOM
            searchView.renderResults(state.search.searchResults);

        } catch (error) {
            console.log(error);
        };

    };


};

const controllerCards = async (id) => {

    // Clear DOM   
    cardsView.clearElements();

    // Render the loader
    renderLoader(document.querySelector(classes.sectionWrapper));


    try {

        // Fetch card
        await state.cards.getCard(state.temperatureUnit, id, state.favorite.id);

        // Store it on the localStorage
        state.cards.persistData();

        // Clear the loader   
        cardsView.clearElements();

        // Render results
        cardsView.renderResults(state.cards, state.temperatureUnit, state.intervals);


    } catch (error) {
        console.log(error);
    };


};

const controllerCurrentLocation = () => {

    const successCallback = async (position) => {

        // Creates a new CurrentLocation object on the state
        state.currentLocation = new CurrentLocation(position.coords.latitude, position.coords.longitude);

        try {

            // Clean the container
            currentLocationView.clearElements();

            // Render loader
            renderLoader(document.querySelector(classes.currentLocation));

            // Fetch data from the server
            await state.currentLocation.getResults(state.temperatureUnit);

            // Clear Loader
            currentLocationView.clearElements();

            // Render the results
            currentLocationView.renderResults(state.currentLocation.result, state.currentLocation.weather, state.temperatureUnit, state.intervals);


        } catch (error) {
            console.log(error);

        };

    };

    const errorCallback = (error) => {
        // console.error(error);
    };

    // Get currentLocation from the browser
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

const controllerFavorite = (favorite, favoriteId) => {

    // Clear the DOM
    favoriteView.clearElements();

    // Render the Loader
    renderLoader(document.querySelector(classes.favorite));

    // Remove favorite card button
    cardsView.removeFavButton(state.cards);

    // Search for favorites on the object
    let indexCard = state.cards.cards.findIndex(e => e.isFavorite === true);

    // If detects a a true on the object set it to false
    if (indexCard !== -1) state.cards.cards[indexCard].isFavorite = false;

    // Get the id of the card
    indexCard = state.cards.cards.findIndex(e => e.data.id == favoriteId);

    // Change the favourite field
    state.cards.cards[indexCard].isFavorite = true;

    // Store the new city to the state object favorite
    state.favorite.changeFavorite(favorite.data.id, favorite.data.name, favorite.data.sys.country, favorite.weather, favorite.data.timezone, favorite.data.weather[0].icon);

    // Clean the favorite container
    favoriteView.clearElements();

    // Render the results
    favoriteView.renderResults(state.favorite, state.temperatureUnit, state.intervals);

    // Render favorite card button
    cardsView.addFavButton(state.cards);
    // }

};

const controllerTemperatureUnit = () => {

    // Get all of the cards elements on the DOM
    const cards = document.querySelectorAll(`${ids.weathers}`);

    // Get all of the forecast elements on the DOM
    const forecast = document.querySelectorAll(`${classes.forecast}`);

    // Check if the temperatuyreUnit on the state is metric
    if (state.temperatureUnit === 'metric') {

        // Change the temperatureUnit to imperial
        state.temperatureUnit = 'imperial';

        // Call temperatureACtions
        temperaturesActions(cards, forecast);

    } else {

        // Change the temperatureUnit to metric
        state.temperatureUnit = 'metric';

        // Call the temperatureActions
        temperaturesActions(cards, forecast);

    };
};

const temperaturesActions = (cards, forecast) => {
    // Store on the localStorage the new temperatureUnit
    localStorage.setItem("temperatureUnit", JSON.stringify(state.temperatureUnit));

    // If cards exists, change all of the temperatures to the new
    if (state.cards) {

        // Loop over the cards array on the state
        state.cards.cards.map(e => {
            // Convert all of the temperatures of the cards on the state
            e.weather = temperatureUnitView.stateConvertWeather(e.weather, state.temperatureUnit);
        });

        // Render the temperatures
        temperatureUnitView.renderNewWeather(cards, state.cards.cards, state.temperatureUnit);
    };


    // Check if the favorite object exists on the state
    if (state.favorite) {

        // Change the weather on the favorite state
        state.favorite.weather = temperatureUnitView.stateConvertWeather(state.favorite.weather, state.temperatureUnit);

        // Render the weather on the favorite view
        favoriteView.renderWeather(state.favorite.weather, state.temperatureUnit);

    };

    // Check if the currentLocation object exists on the state
    if (state.currentLocation) {

        // change the weather on the currentLocation state
        state.currentLocation.weather = temperatureUnitView.stateConvertWeather(state.currentLocation.weather, state.temperatureUnit);

        // Render the weather on the currentLocation view
        currentLocationView.renderWeather(state.currentLocation.weather, state.temperatureUnit);
    };

    // Check if the country object exists on the state
    if (state.country) {

        // Get all of the country elements on the DOM
        const country = document.querySelectorAll(`${classes.countryWeatherGroup}`);

        // Loop over the country array on the state
        state.country.weeks.map(e => {
            e.map(el => {
                el.map(elem => {
                    // Convert all of the temperatures on the object country
                    elem.main.temp = temperatureUnitView.stateConvertWeather(elem.main.temp, state.temperatureUnit);
                });
            });
        });

        // Create an aux variable
        let weeksArray = null;

        // Checks if is there any country data
        if (state.country.weeks.length > 0) {

            // Build the week Weather Array 
            weeksArray = singleCountryView.weekArrayConstructor(state.country.weeks);

            // currentLocationView.renderWeathers(country, weeksArray, state.temperatureUnit);
            renderWeathers(country, weeksArray, state.temperatureUnit);

            // Render weathers for the forecast
            renderWeathers(forecast, state.country.weeks[0][state.country.active], state.temperatureUnit);
        };
    };
};

const constrollerHome = () => {

    // Render home
    homeView.renderHome();

    // Cheack if exists current location state to render the results
    if (state.currentLocation) {

        // Clear the DOM
        currentLocationView.clearElements();

        // Render the currentLocations
        currentLocationView.renderResults(state.currentLocation.result, state.currentLocation.weather, state.temperatureUnit, state.intervals);
    };

    // Check if exists favorite location state to render the results
    if (state.favorite.id) {

        // Clear the DOM
        favoriteView.clearElements();

        // Render the favorite locations
        favoriteView.renderResults(state.favorite, state.temperatureUnit, state.intervals);
    };

    // Check if exists cards state to render the results
    if (state.cards) {

        // Clear the DOM
        cardsView.clearElements();

        // Render the cards
        cardsView.renderResults(state.cards, state.temperatureUnit, state.intervals);
    };
};


// * EVENTS

document.addEventListener('click', e => {

    try {

        // Get the Node
        const query = e.target.closest("a");

        // Aux variable
        let index = null;

        // Perform actions by closest class
        switch (query.className) {
            case (links.addNewContainer):

                // Get the dataset
                const id = query.dataset.id;

                // Clear the DOM
                searchView.clearElements();

                // Close the search box
                searchView.hideSearchPopup();

                // Render new card
                controllerCards(id);
                break;
            case (links.itemContainerAddNew):
                // Show search box
                searchView.showSearchPopup();
                break;
            case (links.addNewContainerClose):
                // Close the search box
                searchView.hideSearchPopup();
                break;
            case (links.itemContainerFav):

                // Get the id from the html tag data set
                const favoriteId = query.dataset.id;

                // get the country object
                const favoriteObject = state.cards.cards.find(e => e.data.id == favoriteId);

                // call the controller
                controllerFavorite(favoriteObject, favoriteId);

                break;
            case (links.itemContainerDel):

                // Get the ID from the html tag data set
                index = query.dataset.id;

                // Call the deleteCard method from the Cards class
                state.cards.deleteCard(index);

                // Remove the card from the DOM
                const element = query.parentElement;

                // Remove elements on cardsView
                cardsView.removeElement(element);
                break;
            case (links.countryGroup):

                // Get the ID from the html tag data set
                index = query.dataset.id;

                // Change the active state
                state.country.active = parseInt(index);

                // Render the forecast weather day
                singleCountryView.renderForecasts(state.country.weeks[0][parseInt(index)], state.temperatureUnit);
                break;
            case (links.countryContainerClose):
                // Clean the forecast container
                document.querySelector('main').innerHTML = '';

                // Clean the state
                state.country = new SingleCountry();

                // Render the home
                constrollerHome();
                break;
            default:
                break;

        };
    } catch (error) {

    };

});

document.addEventListener('submit', e => {

    // Prevent the page to reload on the submit form of search
    e.preventDefault();

    // Call the controllerSearch
    controllerSearch();


});

document.addEventListener('change', e => {

    // Patterns to remove some unexpected value
    const temperatureUnitBtnPatter = new RegExp((`\\b${classes.temperatureUnitBtn}\\b`));
    const darkModeBtnPattern = new RegExp((`\\b${classes.darkModeBtn}\\b`));


    if (temperatureUnitBtnPatter.test(e.target.className)) {

        // Change the C for F or the reverse
        controllerTemperatureUnit();

    } else if (darkModeBtnPattern.test(e.target.className)) {

        // Change the mode on the state
        state.dark.toggleMode();

        // Perform the action
        document.querySelector('body').classList.toggle('dark');

    };
});

const controllerCountryPage = async () => {

    // If country object is not on the state, create a new one
    if (!state.country) state.country = new SingleCountry();

    // Get the id from the URL
    const id = window.location.hash.replace("#", "");

    // If id have value
    if (id !== '') {

        // Render Loader
        renderLoader(document.querySelector('main'));

        // Clear all intervals
        state.intervals.forEach(clearInterval);

        // Empty the array
        state.intervals = [];

        // Clear DOM
        document.querySelector('main').innerHTML = "";

        // Fetch Results from the api
        await state.country.getResults(state.temperatureUnit, id);

        // Get city name
        const cityName = state.cards.cards.filter(e => e.data.id == id);

        // Render results
        singleCountryView.renderSingleCountry(state.country.weeks, cityName[0].data.name, state.temperatureUnit);
    };
};

window.addEventListener('hashchange', e => {

    // Prevent reload from the hashchange
    e.preventDefault();

    // Call the controllerCountryPage
    controllerCountryPage();
});

// Execute on load
window.addEventListener("load", () => {

    // Remove the hash from the url
    var noHashURL = window.location.href.replace(/#.*$/, '');
    window.history.replaceState('', document.title, noHashURL);

    // Execute init
    init();
});
