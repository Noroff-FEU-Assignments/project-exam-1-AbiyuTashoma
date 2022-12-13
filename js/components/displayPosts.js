function displayPosts(postList) {
    let html = "";

    for (let i = 0; i < postList.length; i++) {

        const imageSrc = getImageSource(postList[i]["content"]["rendered"]);
        const postDate = truncate (postList[i]["date"], 0, postList[i]["date"].indexOf('T'));
        const rawExcerpt = postList[i]["excerpt"]["rendered"];
        const excerpt = truncate (rawExcerpt, rawExcerpt.indexOf('>') + 1, rawExcerpt.indexOf('</'));

        html += `<div class="blog-post">
                    <a href="ablog.html?postID=${postList[i]["id"]}" title="read" class="ghost-link-blog">
                        <img src=${imageSrc[0]} class="blog-post-image">
                    </a>
                    <div>
                        <a href="ablog.html?postID=${postList[i]["id"]}" title="read" class="ghost-link-blog">
                            <p class="post-title">${postList[i]["title"]["rendered"]}</p>
                            <p class="post-date">${postDate}</p>
                            <p class="post-excerpt">${excerpt}</p>
                        </a>
                        <div class="elementcta-div">
                            <a href="ablog.html?postID=${postList[i]["id"]}" title="read" class="element-cta landing-cta">Read</a>
                        </div>
                    </div>
                </div>`;
    }

    return html;
}