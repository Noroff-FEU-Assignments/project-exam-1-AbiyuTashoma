function displayComment (blogComment) {
    let html = "";

    for (let l = 0; l < blogComment.length; l++) {
        const commentDate = truncate (blogComment[l]["date"], 0, blogComment[l]["date"].indexOf('T'));

        const rawContent = blogComment[l]["content"]["rendered"];
        const content = truncate (rawContent, rawContent.indexOf('>') + 1, rawContent.indexOf('</'));

        html += `<div class="comment-div">
                    <p class="author-name">${blogComment[l]["author_name"]}</p>
                    <p class="comment-date">${commentDate}</p>
                    <p class="comment-content">${content}</p>
                </div>`;
    }

    return html;
}