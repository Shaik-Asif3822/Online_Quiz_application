let searchinputEl = document.getElementById("searchInput");
let searchresultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAppendsearchresult(result) {
    let {
        link,
        title,
        description
    } = result;
    let resultitemEl = document.createElement("div");
    resultitemEl.classList.add("result-item");



    let titleEl = document.createElement("a");
    titleEl.textContent = title;
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.classList.add("result-title");
    resultitemEl.appendChild(titleEl);

    let titlebreakEl = document.createElement("br");
    resultitemEl.appendChild(titlebreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    resultitemEl.appendChild(urlEl);

    let linkbreakEl = document.createElement("br");
    resultitemEl.appendChild(linkbreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultitemEl.appendChild(descriptionEl);

    searchresultsEl.appendChild(resultitemEl);

}


function displayResults(search_results) {
    spinnerEl.classList.toggle("d-none");
    for (let result of search_results) {
        createAppendsearchresult(result);
    }
}


function searchwikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchresultsEl.textContent = "";
        let searchinput = searchinputEl.value;

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchinput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }

}
searchinputEl.addEventListener("keydown", searchwikipedia);