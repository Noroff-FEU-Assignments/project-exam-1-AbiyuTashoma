const carouselContainer = document.querySelector(".carousel");
const loadingContainer = document.querySelector(".loading");
const carouselListContainer = document.querySelector(".carousel-list");
const prevContainer = document.querySelector(".previuos");
const nextContainer = document.querySelector(".next");

let startIndex = 0;
let endIndex = 0;

url = "https://www.myblog.casa/wp-json/wp/v2/posts";

function display (posts) {
    let html = "";

    for (let i = 0; i < 4; i++) {

        const postDate = truncate (posts[i]["date"], 0, posts[i]["date"].indexOf('T'));
        const rawExcerpt = posts[i]["excerpt"]["rendered"];
        const excerpt = truncate (rawExcerpt, rawExcerpt.indexOf('>') + 1, rawExcerpt.indexOf('</'))
        const imageSrc = getImageSource(posts[i]["content"]["rendered"]);

    html += `   <div class="post">
                    <a href="ablog.html?postID=${posts[i]["id"]}" title="read" class="ghost-link-post">
                        <img src=${imageSrc[0]} class="blog-post-image">
                    </a>
                    <div>
                        <a href="ablog.html?postID=${posts[i]["id"]}" title="read" class="ghost-link-post">
                            <p class="post-title">${posts[i]["title"]["rendered"]}</p>
                            <p class="post-date">${postDate}</p>
                            <p class="post-excerpt">${excerpt}</p>
                        </a>
                        <div class="elementcta-div">
                            <a href="ablog.html?postID=${posts[i]["id"]}" title="read" class="element-cta landing-cta">Read</a>
                        </div>
                    </div>
                </div>`;

        startIndex += 1;
        endIndex -= 1;
    }

    return html;
}

function displayNext (nPosts, start = 0) {
    let html = "";

    for (let i = 0; i < 4; i++) {

        const postDate = truncate (nPosts[start]["date"], 0, nPosts[start]["date"].indexOf('T'));
        const rawExcerpt = nPosts[start]["excerpt"]["rendered"];
        const excerpt = truncate (rawExcerpt, rawExcerpt.indexOf('>') + 1, rawExcerpt.indexOf('</'));
        const imageSrc = getImageSource(nPosts[start]["content"]["rendered"]);

        html += `<div class="post">
                    <a href="ablog.html?postID=${nPosts[start]["id"]}" title="read" class="ghost-link-post">
                        <img src=${imageSrc[0]} class="blog-post-image">
                    </a>
                    <div>
                        <a href="ablog.html?postID=${nPosts[start]["id"]}" title="read" class="ghost-link-post">
                            <p class="post-title">${nPosts[start]["title"]["rendered"]}</p>
                            <p class="post-date">${postDate}</p>
                            <p class="post-excerpt">${excerpt}</p>
                        </a>
                        <div class="elementcta-div">
                            <a href="ablog.html?postID=${nPosts[start]["id"]}" title="read" class="element-cta landing-cta">Read</a>
                        </div>
                    </div>
                </div>`;

        start += 1;
        endIndex += 1;

        if (endIndex >= nPosts.length) {
            endIndex = 0;
        }

        if (start >= nPosts.length) {
            start = 0;
        }
        
    }

    startIndex = start;

    return html;
}

function displayPreviuos (pPosts, pStart = 0) {
        let html = "";

    for (let i = 0; i < 4; i++) {

        const postDate = truncate (pPosts[pStart]["date"], 0, pPosts[pStart]["date"].indexOf('T'));
        const rawExcerpt = pPosts[pStart]["excerpt"]["rendered"];
        const excerpt = truncate (rawExcerpt, rawExcerpt.indexOf('>') + 1, rawExcerpt.indexOf('</'))
        const imageSrc = getImageSource(pPosts[pStart]["content"]["rendered"]);

        html += `<div class="post">
                    <a href="ablog.html?postID=${pPosts[pStart]["id"]}" title="read" class="ghost-link-post">
                        <img src=${imageSrc[0]} class="blog-post-image">
                    </a>
                    <div>
                        <a href="ablog.html?postID=${pPosts[pStart]["id"]}" title="read" class="ghost-link-post">
                            <p class="post-title">${pPosts[pStart]["title"]["rendered"]}</p>
                            <p class="post-date">${postDate}</p>
                            <p class="post-excerpt">${excerpt}</p>
                        </a>
                        <div class="elementcta-div">
                            <a href="ablog.html?postID=${pPosts[pStart]["id"]}" title="read" class="element-cta landing-cta">Read</a>
                        </div>
                    </div>
                </div>`;

        pStart += 1;
        endIndex -= 1;
        startIndex -= 1;
        
        if (startIndex < 0) {
            startIndex = pPosts.length -1;
        }

        if (pStart >= pPosts.length) {
            pStart = 0;
        }

        if (endIndex < 0) {
            endIndex = pPosts.length - 1;
        }
    }

    return html;
}

async function getLatestPosts() {
    try {
        const lResponse = await fetch(url);
        const latestPosts = await lResponse.json();
        endIndex = latestPosts.length;

        carouselListContainer.style.display = "flex";
        loadingContainer.style.display = "none";
        carouselListContainer.innerHTML = display(latestPosts);
        console.log(latestPosts);
    }

    catch (error) {
        carouselListContainer.innerHTML = displayMessage("An error ocurred!", "error");
    }

}

async function next() {
    try {
        carouselListContainer.innerHTML = `<div class="loading"></div>`;
        carouselListContainer.style.display = "block";
        const nResponse = await fetch(url);
        const nextPosts = await nResponse.json();

        carouselListContainer.style.display = "flex";
        loadingContainer.style.display = "none";
        carouselListContainer.innerHTML = displayNext(nextPosts, startIndex);
    }

    catch (error) {
        carouselListContainer.innerHTML = displayMessage("An error ocurred!", "error");
    }
    
}

async function previuos() {
    try {
        carouselListContainer.innerHTML = `<div class="loading"></div>`;
        carouselListContainer.style.display = "block";
        const pResponse = await fetch(url);
        const prevPosts = await pResponse.json();

        carouselListContainer.style.display = "flex";
        loadingContainer.style.display = "none";
        carouselListContainer.innerHTML = displayPreviuos(prevPosts, endIndex);
    }

    catch (error) {
        carouselListContainer.innerHTML = displayMessage("An error ocurred!", "error");
    }
}

getLatestPosts();

nextContainer.addEventListener("click", next);
prevContainer.addEventListener("click", previuos);
