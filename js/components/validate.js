function validateText (stringValue, len = 1) {
    if (stringValue.trim().length >= len) {
        return true;
    }

    else {
        return false;
    }
}

function validateEmail (emailValue) {
    const regEx = /\S+@\S+\.\S+/;
    const match = regEx.test(emailValue);
    return match;
}