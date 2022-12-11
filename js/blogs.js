const blogsContainer = document.querySelector(".blogs");

url = "https://www.myblog.casa/wp-json/wp/v2/posts";

async function getPosts() {
    const response = await fetch(url);
    const posts = await response.json();

    blogsContainer.innerHTML = displayPosts(posts);

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

getPosts();