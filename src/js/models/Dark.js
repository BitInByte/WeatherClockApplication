// class DARK =====================================================
export default class Dark {

    // Constructor =====================================================
    constructor() {
        this.darkMode = false;
    };

    // Toggle Dark =====================================================
    toggleMode() {

        // Toggle the value
        this.darkMode = !this.darkMode;

        // Call the store method
        this.persistData();
    };

    persistData() {
        // Store it on the local Storage with JSON object
        localStorage.setItem("dark", JSON.stringify(this.darkMode));
    };

    readStorage() {

        // Read the value from the local Storage and convert the JSON object
        const storage = JSON.parse(localStorage.getItem("dark"));

        // If there is a value, update the value on the constructor
        if (storage) {
            this.darkMode = storage;
        };

    };
};