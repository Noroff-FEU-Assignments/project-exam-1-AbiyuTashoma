const aBlogContainer = document.querySelector(".a-blog");
const aBlogTitleContainer = document.querySelector(".ablog-title");
const modalContainer = document.querySelector(".modal-container");
const modalImage = document.querySelector("#image");
const bodyContainer = document.querySelector("body");

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const postID = parameter.get("postID");

const baseURL = "https://www.myblog.casa/wp-json/wp/v2/posts/";
const commentURL = "https://www.myblog.casa/wp-json/wp/v2/comments/?post=";

const newURL = baseURL + postID;
const newCommentURL = commentURL + postID;

async function getAPost () {
    aBlogContainer.innerHTML = `<div class="loading"></div>`;

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

        for (let j = 0; j < blogImage.length; j++) {
            blogImage[j].onclick = function () {
                modalContainer.style.display = "block";
                modalContainer.style.top = `${window.scrollY}px`;
                modalImage.src = blogImage[j]["src"];
                bodyContainer.className = "stop-scroll";
            }
        }

        getComment (newCommentURL);
    }

    catch (error) {
        aBlogContainer.innerHTML = displayMessage("An error ocurred!", "error");
    }
}

function closeModal () {
    modalContainer.style.display = "none";
    bodyContainer.className = "";
}

function clickModal (event) {
    event.stopImmediatePropagation()
}

getAPost ();
modalContainer.addEventListener("click", closeModal);
modalImage.addEventListener("click", clickModal);