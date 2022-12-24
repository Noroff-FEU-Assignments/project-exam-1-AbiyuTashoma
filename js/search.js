const searchFormContainer = document.querySelector(".search-form");
const searchFieldContainer = document.querySelector(".search-field");
const mainSectionContainer = document.querySelector(".main-section");
const winHeight = window.screen.availHeight;

const searchURL = "https://www.myblog.casa/wp-json/wp/v2/posts/?search=";

async function searchBlog (searchString) {
    const newSearchURL = searchURL + `${searchString}`;
    
    try {
        const sResponse = await fetch(newSearchURL);
        const sResult = await sResponse.json();

        mainSectionContainer.innerHTML = `<div class="blogs-section">
                                            <h1 class="content-h1">Search results: ${sResult.length}</h1>
                                            <div class="blogs">
                                                ${displayPosts(sResult)}
                                            </div>
                                        </div>`;

        const blogsSearchContainer = document.querySelector(".blogs");
        blogsSearchContainer.style.display = "grid";
        mainSectionContainer.style.minHeight = `${winHeight - 490}px`;

    }

    catch (error) {
        mainSectionContainer.innerHTML = displayMessage("An error ocurred!", "error");
    }
}

function search (event) {
    event.preventDefault();
    const searchValue = searchFieldContainer.value;

    if (searchValue) {
        searchBlog(searchValue);
    }
}

searchFormContainer.addEventListener("submit", search);