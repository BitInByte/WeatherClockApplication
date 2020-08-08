// ===== Private methods =====
const renderHomeContainer = () => {

    // Build the new markup
    const markup = `
        <section class="section-home container">
            <div class="animate-fade-in home-container__wraper">
                <div class="home-container home-container--current-location">
                    <div class="home-container__welcome-message">
                        <h2 class="heading-secondary u-color-alert">
                            The location have to be enabled to display your weather
                        </h2>
                    </div>
                </div>
                <div class="home-container home-container--favorite">
                    <div class="home-container__welcome-message">
                        <h2 class="heading-secondary u-color-alert">
                            No country as set as favourite yet
                        </h2>
                    </div>
                </div>
            </div>

        </section>

        <section class="section-wrapper container animate-fade-in">
            <div class="col-1-of-4">
                <div class="item-container">

                    <a href="#" class="item-container__add-new-link">
                        <div class="item-container__add-new">

                            <ion-icon name="add-outline" class="item-container__add-new-icon"></ion-icon>

                        </div>
                    </a>

                </div>
            </div>
        </section>
        `;

    // Render the new markup to the DOM
    document.querySelector('main').insertAdjacentHTML('afterbegin', markup);
};

// ===== Public methods =====
// GETS =====================================================
export const renderHome = () => {

    // Call the renderHomeContainer
    renderHomeContainer();

};