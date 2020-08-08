// Search async query fetch

// Imports =====================================================
import axios from "axios";

// class CurrentLocation =====================================================
export default class CurrentLocation {

    // Contructor
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
    }

    async getResults(unit) {

        // Get proxy and key from an .env file
        const proxy = process.env.API_PROXY;
        const key = process.env.API_KEY;

        try {

            // Results
            const result = await axios(`${proxy}api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=${unit}&appid=${key}`);

            // Storing results to the object
            this.result = result.data;

            // Storing weather into new property to convert on a copy and not on the original data
            this.weather = result.data.main.temp;


        } catch (error) {
            console.log(error);
            // alert(error);

        };
    };

};