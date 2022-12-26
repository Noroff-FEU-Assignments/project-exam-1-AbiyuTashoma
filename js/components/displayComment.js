function displayComment (blogComment) {
    let html = "";

    for (let l = 0; l < blogComment.length; l++) {
        const commentDate = truncate (blogComment[l]["date"], 0, blogComment[l]["date"].indexOf('T'));

        html += `<div>
                    <p class="author-name">${blogComment[l]["author_name"]}</p>
                    <p class="comment-date">${commentDate}</p>
                    ${blogComment[l]["content"]["rendered"]}
                </div>`;
    }

    return html;
}