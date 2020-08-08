import { convertTimezone, renderTemperatureUnitSymbol, classes } from './base';

// ===== Private methods =====

// Get time based in timezone
const updateTime = (timezone, id, intervals) => {

    const interval = setInterval(() => {

        // Get the element from the DOM
        const elem = document.getElementById(`${id}`);

        if (elem) {
            // If the element is on the DOM render the new time 
            document.querySelector(`#${id}`).innerHTML = convertTimezone(timezone);
        } else {

            // If the element is not on the DOM, stops the Interval loop
            clearInterval(interval);

        };

    }, 1000);

    // Store the interval on the state intervals array
    if (interval) intervals.push(interval);

};

// Function to short the title
const shortTitle = (title) => {

    // Convert the string title into an array
    const titleArray = title.split("");

    // New string variable
    let shortedTitle = '';

    // Check if the title have more than 19 chars
    if (titleArray.length > 19) {

        // Cut all of the non needed chars
        shortedTitle = titleArray.splice(0, 16);

        // Convert the array to a string again
        shortedTitle = shortedTitle.join('');

        // Add ... on the end of the title
        shortedTitle = shortedTitle + '...';

    } else {

        // Doesnt change nothing
        shortedTitle = title;
    };

    return shortedTitle;
};


const renderFavoriteIcon = (isFavorite) => {
    // If favorite is true render one button if not, render a different button
    if (isFavorite) {
        return '<ion-icon name="star" class="item-container__fav-icon"></ion-icon>';
    } else {
        return '<ion-icon name="star-outline" class="item-container__fav-icon"></ion-icon>';
    };

};

// Clear the target favorite button
const cleanFavoriteButton = (id) => document.querySelector(`#fav-${id}`).innerHTML = "";

// Toggle the favoriteButton
const toggleFavoriteButton = (cards, option) => {

    // Create a new string variable
    let markup = '';

    // If the option is add
    if (option === "add") {

        // Create the markup to the favorite button
        markup = '<ion-icon name="star" class="item-container__fav-icon"></ion-icon>';

        // Render
        mapCardsButtons(cards, markup);

    } else if (option === "remove") {

        // Create a different markup to the remove option
        markup = '<ion-icon name="star-outline" class="item-container__fav-icon"></ion-icon>';

        // Render
        mapCardsButtons(cards, markup);

    };

};

const mapCardsButtons = (cards, markup) => {

    // Loop over the cards array
    cards.cards.map(e => {

        // Check if its favorite
        if (e.isFavorite) {

            // Clear the favorite button
            cleanFavoriteButton(e.data.id);

            // Render the new markup
            document.querySelector(`#fav-${e.data.id}`).insertAdjacentHTML('afterbegin', markup);
        };
    });
};

const renderResult = (name, country, temp, icon, weather, timezone, id, isFavorite, temperatureUnit, intervals) => {


    // Create the markup
    const markup = `
        <div class="col-1-of-4">

                    <div class="item-container animate-fade-in">
                        
                            <div class="item-container__side item-container--front">
                                <span class="item-container__title">
                                    ${shortTitle(name)}
                                </span>
                                <span class="item-container__country">
                                    ${country}
                                </span>
                                <img src="resources/img/weather-icons/${icon}.svg" alt="${weather}" class="item-container__icon" />
                                <!-- <ion-icon name="sunny-outline" class="item-container__icon"></ion-icon> -->
                                <div class="item-container__weather" id="item-container__weather">
                                    ${Math.round(temp)}&deg;${renderTemperatureUnitSymbol(temperatureUnit)}
                                </div>
                            </div>

                            <div class="item-container__side item-container--back">
                                <a href="#${id}">
                                    <div class="item-container__time" id="clock-${id}">
                                        
                                    </div>
                                </a>
                                <a href="#" class="item-container__fav-link" data-id="${id}">
                                    <div class="item-container__fav" id="fav-${id}">
                                            ${renderFavoriteIcon(isFavorite)}      
                                    </div>
                                </a>

                                <div class="item-container__delete">
                                    <a href="#" class="item-container__del-link" data-id="${id}">
                                        <ion-icon name="close-circle-outline" class="item-container__delete-icon"></ion-icon>
                                        <!-- <ion-icon name="close-circle" class="item-container__delete-icon"></ion-icon> -->
                                    </a>
                                </div>
                            </div>
                    </div>
                    
                </div>
    `;

    // Render the new markup
    document.querySelector(classes.sectionWrapper).insertAdjacentHTML('beforeend', markup);

    //  Render clock one time before the setInterval
    document.querySelector(`#clock-${id}`).innerHTML = convertTimezone(timezone, `clock-${id}`);

    // Update the time with an interval
    updateTime(timezone, `clock-${id}`, intervals);
};

const renderAddNew = () => {

    // Create the markup to the add New city button
    const markup = `
        <div class="col-1-of-4">
            <div class="item-container animate-fade-in">
                <a href="#" class="item-container__add-new-link">
                    <div class="item-container__add-new">
                            <ion-icon name="add-outline" class="item-container__add-new-icon"></ion-icon>    
                    </div>
                </a>
            </div>
        </div>
    `;

    // Render the markup on the DOM
    document.querySelector(classes.sectionWrapper).insertAdjacentHTML('beforeend', markup);
};


// ===== Public methods =====
// GETS =====================================================

// Clear the container
// export const clearElements = () => elements.cardsSection.innerHTML = "";
export const clearElements = () => document.querySelector(classes.sectionWrapper).innerHTML = "";

// DOM =====================================================
// Render the results
export const renderResults = (data, temperatureUnit, intervals) => {

    // Loop over the cards array
    data.cards.map(e => {
        // Render the data on the DOM
        renderResult(e.data.name, e.data.sys.country, e.weather, e.data.weather[0].icon, e.data.weather.main, e.data.timezone, e.data.id, e.isFavorite, temperatureUnit, intervals);
    });

    renderAddNew();

};

// Remove favorite button
export const removeFavButton = (data) => toggleFavoriteButton(data, "remove");

// Add favorite button
export const addFavButton = (data) => toggleFavoriteButton(data, "add");

// Remove the card from the element
export const removeElement = (element) => element.parentNode.parentNode.parentNode.remove();