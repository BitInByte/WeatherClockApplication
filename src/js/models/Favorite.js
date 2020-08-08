// class CARDS =====================================================
export default class Favorite {

    // Store the new Favorite on the object
    changeFavorite(id, name, country, weather, timezone, icon) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.icon = icon;
        this.weather = weather;
        this.timezone = timezone;

        // Store it on the localStorage
        this.persistData();
    };

    persistData() {
        // Store it on the local Storage with JSON object
        localStorage.setItem("favorite", JSON.stringify(this.id));
    };

    readStorage() {

        // Get the data from the localStorage
        const storage = JSON.parse(localStorage.getItem("favorite"));

        // If fetch any data
        if (storage) {
            // Store the id on the object
            this.id = storage
        };

    };
};