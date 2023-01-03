const blogsContainer = document.querySelector(".blogs");
const viewMoreContainer = document.querySelector(".view-more-button");
const orderByContainer= document.querySelector("#order");

const url = "https://www.myblog.casa/wp-json/wp/v2/posts";
const offset = "&offset=10";
const orderby = "/?orderby=";
const orderAscending = "&order=asc";
const date = "date";

let defaultView = url + orderby + date;

async function getPosts (postsURL) {
    blogsContainer.innerHTML += `<div class="loading"></div>`;
    
    try {
        const response = await fetch(postsURL);
        const posts = await response.json();
        
        blogsContainer.style.display = "grid";
        blogsContainer.innerHTML = displayPosts(posts);
    }
    
    catch (error) {
        blogsContainer.innerHTML = displayMessage("An error ocurred!", "error");
        viewMoreContainer.disabled = "true";
        viewMoreContainer.className = "view-more-disabled";
    }

}

async function getMorePosts () {
    const offsetURL = defaultView + offset;
    blogsContainer.innerHTML += `<div class="loading"></div>`;
    const loadingContainer = document.querySelector(".loading");

    try {
        const mResponse = await fetch(offsetURL);
        const mPosts = await mResponse.json();

        loadingContainer.style.display = "none";
        blogsContainer.innerHTML += displayPosts(mPosts);

        viewMoreContainer.disabled = "true";
        viewMoreContainer.className = "view-more-disabled";
    }
    
    catch (error) {
        loadingContainer.style.display = "none";
        blogsContainer.innerHTML += displayMessage("An error ocurred!", "error");
        viewMoreContainer.disabled = "true";
        viewMoreContainer.className = "view-more-disabled";
    }
}

function orderBy () {
    const orderbyURL = url + orderby;
    const orderByValue = orderByContainer.value;
    let obURL = orderbyURL + `${orderByValue}`;

    if (orderByValue == "title") {
        obURL += orderAscending;
    }

    getPosts(obURL);
    defaultView = obURL;
    // const viewMoreDisabled = document.querySelector(".view-more-disabled");
    // viewMoreDisabled.disabled = "false";
    // viewMoreDisabled.className = "view-more-button";
}

getPosts(defaultView);

viewMoreContainer.addEventListener("click", getMorePosts);
orderByContainer.addEventListener("change", orderBy);
