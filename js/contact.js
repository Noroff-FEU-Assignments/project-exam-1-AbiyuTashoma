const mainSectionContainer = document.querySelector(".main-section");
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
        const feedbackData = {"name": name, "email": email, "subject": subject, "message": message};
        postFeedback (feedbackData);
    }
}

const feedbackURL = "https://www.myblog.casa/wp-json/twentytwentytwo-child/v1/feedback";
async function postFeedback (fbData) {
    try {
        const response = await fetch(feedbackURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fbData)
        });

        const result = await response.json();
        
        if (result["status"] == "success") {
            messageContainer.innerHTML = displayMessage("Message successfully sent!", "success");
            contactFormContainer.reset();
        }

        else {
            messageContainer.innerHTML = displayMessage("An error ocurred!", "error");
        }
    }

    catch (error) {
        messageContainer.innerHTML = displayMessage("An error ocurred!", "error");
    }
}

//Add event listener
contactFormContainer.addEventListener ("submit", validate);

setHeight (mainSectionContainer, 248);