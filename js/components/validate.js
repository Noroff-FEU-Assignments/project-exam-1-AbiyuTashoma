function validateText (stringValue, minLenText = 1) {
    if (stringValue.trim().length >= minLenText) {
        return true;
    }

    else {
        return false;
    }
}

 //
 //"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"

function validateEmail (emailValue) {
    // const regEx = /\S+@\S+\.\S+/;
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const match = regEx.test(emailValue);
    return match;   
}