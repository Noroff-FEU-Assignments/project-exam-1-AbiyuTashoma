const contactFormContainer = document.querySelector(".contact-form");
const messageContainer = document.querySelector(".message");

const nameContainer = document.querySelector("#name");
const emailContainer = document.querySelector("#email");
const subjectContainer = document.querySelector("#subject");
const contactMessageContainer = document.querySelector("#contact-message")

const noteNameContainer = document.querySelector(".note-name");
const noteEmailContainer = document.querySelector(".note-email");
const noteSubjectContainer = document.querySelector(".note-subject");
const noteContactMessageContainer = document.querySelector(".note-contactmessage");

const feedbackURL = "https://myblog.casa/wp-json/contact-form-7/v1/contact-forms/179/feedback";
const contactURL = "https://www.myblog.casa/wp-json/wp/v2/comments/?post=185";
//clear error message onchange and oninput
nameContainer.oninput = function() {
    clearError(noteNameContainer, nameContainer);
}

emailContainer.oninput = function() {
    clearError(noteEmailContainer, emailContainer);
}

subjectContainer.oninput = function() {
    clearError(noteSubjectContainer, subjectContainer);
}

contactMessageContainer.oninput = function() {
    clearError(noteContactMessageContainer, contactMessageContainer);
}

//validate form
function validate(event) {
    event.preventDefault();
    messageContainer.innerHTML = "";
    let validFeedback = true;

    const name = nameContainer.value;
    const email = emailContainer.value;
    const subject = subjectContainer.value;
    const message = contactMessageContainer.value;

    const validName = validateText(name, 6);
    const validEmail = validateEmail(email);
    const validSubject = validateText(subject, 16)
    const validMessage = validateText(message, 26);

    if (!validName) {
        validFeedback = false;
        setError(noteNameContainer, nameContainer, "Name should be minimum 6 characters");
    }

    if (!validEmail) {
        validCheckout = false;
        setError(noteEmailContainer, emailContainer, "Enter valid email");
    }

    if (!validSubject) {
        validFeedback = false;
        setError(noteSubjectContainer, subjectContainer, "Subject should be minimum 16 characters");
    }

    if (!validMessage) {
        validFeedback = false;
        setError(noteContactMessageContainer, contactMessageContainer, "Message should be minimum 26 characters");
    }

    //on submit
    if (validFeedback) {
        const feedbackData = {"user": name, "email": email, "subject": subject, "message": message};
        postFeedback (feedbackData);
        messageContainer.innerHTML = displayMessage("Message successfully sent!", "success");
        contactFormContainer.reset();
    }
}

// contact: LBG2 EZje WgYN o74p 2FDk Ulip
// password: LBG2contactmeEZje //pw protected

// POST comment to wordpress:
async function postFeedback (fbData) {
    try {
        const response = await fetch(contactURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'user': 'contact: LBG2 EZje WgYN o74p 2FDk Ulip',
                'password': 'LBG2contactmeEZje'
            },
            body: JSON.stringify(fbData)
        });

        const result = await response.json();

        // if (result["code"]) {
        //     setError(noteEmailContainer, emailContainer, "Enter valid email");
        // }

        // else {
        //     messageContainer.innerHTML = displayMessage("Comment successfully sent!", "success");
        //     getComment (newCommentURL);
        //     commentFormContainer.reset();
        // }

        console.log(result);
    }

    catch (error) {
        console.log("error:" + error);
    }
}

//Add event listener
contactFormContainer.addEventListener ("submit", validate);