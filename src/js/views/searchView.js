import { elements, classes } from './base';

// ===== Private methods =====
const renderResult = (name, country, state, id) => {

    // Build the new markup
    const markup = `
            <a href="#" class="add-new-container__link" data-id="${id}">
                    <div class="add-new-container__item animate-fade-in">
                        ${name}, <span>${country}</span> 
                    </div>
            </a>
        `;

    // Render the new markup
    document.querySelector(classes.addNew).insertAdjacentHTML('afterbegin', markup);

};

const renderEmpty = () => {

    // Build the new markup
    const markup = `
                    <div class="add-new-container__empty animate-fade-in">
                        Nothing matches with your search
                    </div>
        `;

    // Render the new markup
    document.querySelector(classes.addNew).insertAdjacentHTML('afterbegin', markup);
};


// ===== Public methods =====
// Get the values from the input
export const getInput = () => elements.searchInput.value;

// Clean the input
export const clearInput = () => elements.searchInput.value = "";

// DOM =====================================================

// Clear the elements from the DOM
export const clearElements = () => elements.searchContainer.innerHTML = "";

// Render the results
export const renderResults = (data) => {

    // Check if have data
    if (data.length > 0) {

        // Loop over the data array
        data.map(e => {
            // Render the results
            renderResult(e.name, e.country, e.state, e.id)
        });
    } else {

        // Render empty
        renderEmpty();
    };

};

export const hideSearchPopup = () => {

    // Perform animations on Hide Search Popup
    elements.searchBox.classList.remove(classes.addNewConatinerShowAnimation);
    elements.searchBox.classList.add(classes.addNewContainerHideAnimation);

    document.querySelector(classes.addNewBox).classList.remove(classes.addNewBoxAnimation);
    document.querySelector(classes.addNewClose).classList.remove(classes.addNewCloseAnimation);
    document.querySelector(classes.addNewBoxTitle).classList.remove(classes.addNewBoxTitleAnimation);
    document.querySelector(classes.addNewBoxForm).classList.remove(classes.addNewBoxFormAnimation);
};

export const showSearchPopup = () => {

    // Perform animations on the show Search Popup
    elements.searchBox.classList.remove(classes.addNewContainerHideAnimation);
    elements.searchBox.classList.add(classes.addNewConatinerShowAnimation);

    document.querySelector(classes.addNewBox).classList.add(classes.addNewBoxAnimation);
    document.querySelector(classes.addNewClose).classList.add(classes.addNewCloseAnimation);
    document.querySelector(classes.addNewBoxTitle).classList.add(classes.addNewBoxTitleAnimation);
    document.querySelector(classes.addNewBoxForm).classList.add(classes.addNewBoxFormAnimation);
};

