function displayMessage (message, messageType) {
    const html = `<div class="${messageType} message-area">
                        <span>${message}</span>
                    </div>`;

    return html;
}