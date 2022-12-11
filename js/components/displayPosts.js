function displayPosts(postList) {
    let html = "";

    for (let i = 0; i < postList.length; i++) {

        const imageSrc = getImageSource(postList[i]["content"]["rendered"]);
        const postDate = truncate (postList[i]["date"], 0, postList[i]["date"].indexOf('T'));

        html += `<div class="blog-post">
                    <img src=${imageSrc[0]} class="blog-post-image">
                    <div>
                        <p class="post-title">${postList[i]["title"]["rendered"]}</p>
                        <p class="post-date">${postDate}</p>
                        ${postList[i]["excerpt"]["rendered"]}
                    </div>
                </div>`;

                // console.log(postList[i]["excerpt"]["rendered"]);
    }
    // single post
    // html += `<div class="blog-post">
    //                 ${postList[0]["content"]["rendered"]}
    //             </div>`;

    return html;
}