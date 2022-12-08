const blogsContainer = document.querySelector(".blogs");

url = "https://www.myblog.casa/wp-json/wp/v2/posts";

async function getPosts() {
    const response = await fetch(url);
    const posts = await response.json();

    console.log(posts[0]);
    blogsContainer.innerHTML = displayPosts(posts);

    const blogImage = document.querySelectorAll("figure img");
    console.log(blogImage);

    for (let j = 0; j < blogImage.length; j++) {
        blogImage[j].onclick = function () {
            console.log("image " + j + " clicked");
        }
    }

}

getPosts();