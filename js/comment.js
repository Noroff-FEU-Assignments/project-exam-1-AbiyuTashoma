const commentContainer = document.querySelector(".comment");

const commentFormContainer = document.querySelector(".comment-form");
const messageContainer = document.querySelector(".message");
const nameContainer = document.querySelector("#name");
const commentMessageContainer = document.querySelector("#comment-message")

const noteNameContainer = document.querySelector(".note-name");
const noteCommentMessageContainer = document.querySelector(".note-commentmessage");

async function getComment (cmntURL) {
    commentContainer.innerHTML = `<div class="loading"></div>`;

    try {
        const cResponse = await fetch(cmntURL);
        const comment = await cResponse.json();

        commentContainer.innerHTML = displayComment(comment);
    }

    catch (error) {
        aBlogContainer.innerHTML = displayMessage("An error ocurred!", "error");
    }
}

//clear error message onchange and oninput
nameContainer.oninput = function() {
    clearError(noteNameContainer, nameContainer);
}

commentMessageContainer.oninput = function() {
    clearError(noteCommentMessageContainer, commentMessageContainer);
}

//validate form
function validateComment(event) {
    event.preventDefault();
    messageContainer.innerHTML = "";
    let validComment = true;

    const name = nameContainer.value;
    const comment = commentMessageContainer.value;

    const validName = validateText(name, 6);
    const validMessage = validateText(comment, 6);

    if (!validName) {
        validComment = false;
        setError(noteNameContainer, nameContainer, "Name should be minimum 6 characters");
    }

    if (!validMessage) {
        validComment = false;
        setError(noteCommentMessageContainer, commentMessageContainer, "Comment should be minimum 10 characters");
    }

    //on submit
    if (validComment) {
        messageContainer.innerHTML = displayMessage("Comment successfully sent!", "success");
        commentFormContainer.reset();
    }
}

//Add event listener
commentFormContainer.addEventListener ("submit", validateComment);