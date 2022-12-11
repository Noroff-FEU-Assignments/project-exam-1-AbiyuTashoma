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
        blogsContainer.innerHTML = error;
    }

    // Single post display
    // blogsContainer.innerHTML = posts[0]["content"]["rendered"];

    // const blogImage = document.querySelectorAll("figure img");
    // console.log(blogImage);

    // for (let j = 0; j < blogImage.length; j++) {
    //     blogImage[j].onclick = function () {
    //         console.log("image " + j + " clicked");
    //     }
    // }

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
        blogsContainer.innerHTML += error;
    }
}


getPosts();

viewMoreContainer.addEventListener("click", getMorePosts)