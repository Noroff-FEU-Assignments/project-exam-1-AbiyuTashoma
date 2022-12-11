function displayAPosts(aPost) {
    let html = "";

    html = `<div class="blog">
                    ${aPost["content"]["rendered"]}
                </div>`;

    return html;
}