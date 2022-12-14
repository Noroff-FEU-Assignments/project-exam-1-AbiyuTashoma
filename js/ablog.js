const aBlogContainer = document.querySelector(".a-blog");
const aBlogTitleContainer = document.querySelector(".ablog-title");
const modalContainer = document.querySelector(".modal-container");
const modalImage = document.querySelector("#image");

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

        const blogImage = document.querySelectorAll("figure img");
        console.log(blogImage);

        for (let j = 0; j < blogImage.length; j++) {
            blogImage[j].onclick = function () {
                console.log("image " + j + " clicked");
                modalContainer.style.display = "block";
                modalContainer.style.top = `${window.scrollY}px`;
                console.log(`${window.scrollY}px`);
                modalImage.src = blogImage[j]["src"];

            }

            // console.log(blogImage[j]["className"]);
        }
    
    }

    catch (error) {
        aBlogContainer.innerHTML = error;
    }
}

function closeModal () {
    modalContainer.style.display = "none";
}

function clickModal (event) {
    event.stopImmediatePropagation()
}

getAPost ();
modalContainer.addEventListener("click", closeModal);
modalImage.addEventListener("click", clickModal);