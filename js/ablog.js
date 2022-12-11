aBlogContainer = document.querySelector(".a-blog");

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const postID = parameter.get("postID");

const baseURL = "https://www.myblog.casa/wp-json/wp/v2/posts/";

const newURL = baseURL + postID;

async function getAPost () {
    try {
        aResponse = await fetch(newURL);
        aPost = await aResponse.json();

        aBlogContainer.innerHTML = aPost["content"]["rendered"];
        const blogImage = document.querySelectorAll("figure img");
        console.log(blogImage);

        for (let j = 0; j < blogImage.length; j++) {
            blogImage[j].onclick = function () {
                console.log("image " + j + " clicked");
            }
        }
    
    }

    catch (error) {

    }
}

getAPost ();
    