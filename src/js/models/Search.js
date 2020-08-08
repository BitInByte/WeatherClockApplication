// Search async query fetch

// class Search =====================================================
export default class Search {

    // Constructor =====================================================
    constructor(query) {
        this.query = query;
    };

    // Async function fetching an API =====================================================
    async getSearch(cards = []) {

        // Error handler
        try {

            // Results
            await fetch("../vendors/data/city.list.json")
                .then(response => response.json())
                .then(json => this.result = json);

            // Store the result into an aux variable
            let auxResults = this.result.filter(e => {

                // Method introduced with ES6 to replace all special characters into regular characters, like ç is converted to c
                // .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                if (e.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))) {
                    return e;
                };

            });

            // Check if each result is already a card element
            if (cards.length > 0) {

                // Maps over the cards object
                cards.map(el => {
                    auxResults = auxResults.filter(e => {
                        // If the results is not equal to a card, then returns the element
                        if (e.id !== el.data.id) return e;

                    });
                });

                // Store the new values to the oldest state
                this.searchResults = auxResults;


            } else {

                // Store the values to the state
                this.searchResults = auxResults;
            };


        } catch (error) {
            console.log(error);
            // alert(error);

        };
    };
};