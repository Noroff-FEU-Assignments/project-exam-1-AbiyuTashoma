const blogsContainer = document.querySelector(".blogs");
const viewMoreContainer = document.querySelector(".view-more-button");

const url = "https://www.myblog.casa/wp-json/wp/v2/posts";
const offsetURL = "https://www.myblog.casa/wp-json/wp/v2/posts/?offset=10";

async function getPosts() {
    try {
        const response = await fetch(url);
        const posts = await response.json();
    
        blogsContainer.innerHTML = displayPosts(posts);
    }
    
    catch (error) {
        blogsContainer.innerHTML = displayMessage("An error ocurred!", "error");
        viewMoreContainer.disabled = "true";
        viewMoreContainer.className = "view-more-disabled";
    }

}

async function getMorePosts() {
    try {
        const mResponse = await fetch(offsetURL);
        const mPosts = await mResponse.json();

        blogsContainer.innerHTML += displayPosts(mPosts);

        viewMoreContainer.disabled = "true";
        viewMoreContainer.className = "view-more-disabled";
    }
    
    catch (error) {
        blogsContainer.innerHTML += displayMessage("An error ocurred!", "error");
        viewMoreContainer.disabled = "true";
        viewMoreContainer.className = "view-more-disabled";
    }
}


getPosts();

viewMoreContainer.addEventListener("click", getMorePosts)