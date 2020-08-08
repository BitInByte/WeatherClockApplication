import { classes } from './base';

const renderElements = () => {

    // Build the markup
    const markup = `
        <div class="dark-mode__container">

            <div class="dark-mode"></div>
            <h2 class="heading-secondary dark-mode__title">
                Dark Mode:
            </h2>


            <div class="dark-mode__btn switch__btn">

                <input type="checkbox" id="checkbox" class="switch__checkbox dark-mode__checkbox">
                <label for="checkbox" class="switch__label">
                    <div class="switch__ball"></div>
                </label>

            </div>
        </div>

        <div class="temperature-unit">
            <h2 class="heading-secondary temperature-unit__title">
                Temperature unit:
            </h2>

            <div class="temperature-unit__btn switch__btn">


                <input type="checkbox" id="checkbox-temperature" class="switch__checkbox temperature-unit__checkbox">
                <label for="checkbox-temperature" class="switch__label">
                    <span class="temperature-unit__btn-title switch__btn-title switch__btn-title--1">
                        C
                    </span>
                    <div class="switch__ball"></div>
                    <span class="temperature-unit__btn-title switch__btn-title switch__btn-title--2">
                        F
                    </span>
                </label>


            </div>

        </div>
    `;

    // Render on the screen
    document.querySelector(classes.sectionControls).insertAdjacentHTML('afterbegin', markup);
};

export const renderControlls = () => {
    // Render elements on the DOM
    renderElements();
};