// Search async query fetch

// Imports =====================================================
import axios from "axios";

// class SingleCountry =====================================================
export default class SingleCountry {

    // Constructor =====================================================
    constructor() {
        this.weeks = [];
    };

    // Async function fetching an API =====================================================
    async getResults(unit, id) {

        // Get proxy and key from an .env file
        const proxy = process.env.API_PROXY;
        const key = process.env.API_KEY;

        // Error handler
        try {

            // Results
            const result = await axios(`${proxy}http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${key}&units=${unit}`);

            // Aux variables
            const dateArray = [];
            let helperDate = 0;
            let helperArray = [];

            // Map over the result fetched async
            result.data.list.map(e => {

                // Got the dates from the fetched results
                const date = e.dt_txt.split(' ')[0];

                // If the helperDate is empty then take the first date it catches
                if (helperDate === 0) helperDate = date;

                // If the date is bigger...
                if (date > helperDate) {
                    // HelperDate receive the value of date
                    helperDate = date;

                    // dateArray pushes the helperArray value
                    dateArray.push(helperArray);

                    // Empty de helperArray
                    helperArray = [];

                    // helperArray push the current value
                    helperArray.push(e);
                } else {

                    // helperArray push the current value
                    helperArray.push(e);
                };


            });

            // Push the new data to the object
            this.weeks.push(dateArray);

        } catch (error) {
            console.log(error);
            // alert(error);

        };
    };

};