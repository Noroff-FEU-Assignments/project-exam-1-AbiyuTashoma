aBlogContainer = document.querySelector(".a-blog");
aBlogTitleContainer = document.querySelector(".ablog-title");

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const postID = parameter.get("postID");

const baseURL = "https://www.myblog.casa/wp-json/wp/v2/posts/";

const newURL = baseURL + postID;

async function getAPost () {
    try {
        aResponse = await fetch(newURL);
        aPost = await aResponse.json();

        const aPostDate = truncate (aPost["date"], 0, aPost["date"].indexOf('T'));
        
                            
        aBlogContainer.innerHTML = `<h1 class="ablog-h1">${aPost["title"]["rendered"]}</h1>
                                    <p class="post-date">${aPostDate}</p>
                                    ${aPost["content"]["rendered"]}`;

        document.title += ` | ${aPost["title"]["rendered"]}`;
        aBlogTitleContainer.innerHTML = aPost["title"]["rendered"];

        console.log(aPost);
        const blogImage = document.querySelectorAll("figure img");
        console.log(blogImage);

        for (let j = 0; j < blogImage.length; j++) {
            blogImage[j].onclick = function () {
                console.log("image " + j + " clicked");
            }

            blogImage[j]["className"] += " overlay"

            console.log(blogImage[j]["className"]);
        }
    
    }

    catch (error) {
        aBlogContainer.innerHTML = error;
    }
}

getAPost ();
    