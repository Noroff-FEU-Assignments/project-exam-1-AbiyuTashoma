function displayPosts(postList) {
    let html = "";

    // for (let i = 0; i < postList.length; i++) {
    //     html += `<div class="post">
    //                 ${postList[i]["excerpt"]["rendered"]}
    //             <div>`;
    // }

    html += `<div class="post">
                    ${postList[0]["content"]["rendered"]}
                <div>`;

    return html;
}