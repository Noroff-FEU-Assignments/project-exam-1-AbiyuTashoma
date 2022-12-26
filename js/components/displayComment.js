const commentField = `<form class="comment-form">
                        <div class="message"></div>
                        <p class="leave-comment">Leave comment</p>
                        <input type="text" title="name" id="name" placeholder="Name" name="name" class="input-fields">
                        <div class="note-name"></div>                                                
                        <textarea class="input-fields message-field" id="contact-message" placeholder="Comment" title="message" name="message"></textarea>
                        <div class="note-contactmessage"></div>
                        <input type="submit" title="submit" name="submit" value="Submit" class="submit-comment">
                    </form>`;

function displayComment (blogComment) {
    let html = commentField;

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