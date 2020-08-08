// Search async query fetch

// Imports =====================================================
import axios from "axios";

// class CARDS =====================================================
export default class Cards {

    // Constructor =====================================================
    constructor() {
        this.cards = [];
    }

    // Async function fetching an API =====================================================
    async getCard(unit, id, favoriteId) {

        // Create a favorite object to check if the new city is already on the favorite
        let favorite = false;

        // If the object is already favorite, render the button as favorite
        if (id == favoriteId) favorite = true;

        // Get proxy and key from an .env file
        const proxy = process.env.API_PROXY;
        const key = process.env.API_KEY;

        // Error handler
        try {

            // Results
            const result = await axios(`${proxy}api.openweathermap.org/data/2.5/weather?id=${id}&units=${unit}&appid=${key}`);

            // Weather data
            const weather = result.data.main.temp;

            // Results object build
            const results = {
                data: result.data,
                weather: weather,
                isFavorite: favorite,
            };

            // Push the new data to the cards array of object
            this.cards.push(results);

        } catch (error) {
            console.log(error);
            // alert(error);
        };
    };


    deleteCard(index) {

        // Build a new state deleting the target card
        const newState = this.cards.filter(e => e.data.id != index);

        // Store the new object state on the old state
        this.cards = newState;


        // Store it on the localStorage
        this.persistData();

    };

    persistData() {

        // Build a new careds array
        const cards = [];

        // Build the cards array to store on the localStorage, storing only the IDS
        this.cards.map(e => {
            cards.push(e.data.id)
        });

        // Store the cards array on the localStorage
        localStorage.setItem("cards", JSON.stringify(cards));
    };

    async readStorage(unit) {

        // Read the data from the localStorage
        const storage = JSON.parse(localStorage.getItem("cards")); // If is not a storage already created, this will return a null

        // If is any cards stored
        if (storage) {

            // Get the Cards related to the ids fetched from the localStorage
            for (let item of storage) {
                // Map doesnt performs async await so only for can perform
                await this.getCard(unit, item);
            };

        };
    };
};