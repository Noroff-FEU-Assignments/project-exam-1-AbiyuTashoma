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
        html += `<div class="post">
                    <p class="post-title">${posts[i]["title"]["rendered"]}</p>
                    <p class="post-date">${postDate}</p>
                    <p class="post-excerpt">${excerpt}</p>
                    <div class="elementcta-div">
                        <a href="blogs.html" title="read" class="element-cta landing-cta">Read</a>
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
        const excerpt = truncate (rawExcerpt, rawExcerpt.indexOf('>') + 1, rawExcerpt.indexOf('</'))

        html += `<div class="post">
                    <p class="post-title">${nPosts[start]["title"]["rendered"]}</p>
                    <p class="post-date">${postDate}</p>
                    <p class="post-excerpt">${excerpt}</p>
                    <div class="elementcta-div">
                        <a href="blogs.html" title="read" class="element-cta landing-cta">Read</a>
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

        html += `<div class="post">
                    <p class="post-title">${pPosts[pStart]["title"]["rendered"]}</p>
                    <p class="post-date">${postDate}</p>
                    <p class="post-excerpt">${excerpt}</p>
                    <div class="elementcta-div">
                        <a href="blogs.html" title="read" class="element-cta landing-cta">Read</a>
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

        carouselListContainer.innerHTML = display(latestPosts);
        console.log(latestPosts);
    }

    catch (error) {
        console.log(error);
    }

}

async function next() {
    try {
        const nResponse = await fetch(url);
        const nextPosts = await nResponse.json();

        carouselListContainer.innerHTML = displayNext(nextPosts, startIndex);
    }

    catch (error) {
        console.log(error);
    }
    
}

async function previuos() {
    try {
        const pResponse = await fetch(url);
        const prevPosts = await pResponse.json();

        carouselListContainer.innerHTML = displayPreviuos(prevPosts, endIndex);
    }

    catch (error) {
        console.log(error);
    }
}

getLatestPosts();

nextContainer.addEventListener("click", next);
prevContainer.addEventListener("click", previuos);
