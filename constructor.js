const data = require("./Movie Data/data.json");
let objInfo = new InfoObj(data);

function InfoObj(info) {
    this.id = info.id;
    this.title = info.title;
    this.release_date = info.release_date;
    this.poster_path = info.poster_path;
    this.overview = info.overview;
}

function formatMovie(movie) {
    let movieObject = {
        "id": movie.id,
        "title": movie.title,
        "release_date": movie.release_date,
        "poster_path": movie.poster_path,
        "overview": movie.overview
    }
    return movieObject;
}
module.exports = {
    objInfo,
    formatMovie
}