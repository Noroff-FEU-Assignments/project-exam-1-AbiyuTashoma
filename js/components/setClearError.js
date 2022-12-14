function setError(noteContainer, inputContainer, errorMessage) {
    noteContainer.innerHTML = `<div class="note">${errorMessage}</div>`;
    inputContainer.style.borderColor = "red";
}

function clearError(noteContainer, inputContainer) {
    noteContainer.innerHTML = "";
    inputContainer.style.borderColor = "";
}