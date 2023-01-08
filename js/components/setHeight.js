function setHeight (docElement, deduct = 0) {
    const winHeight = window.screen.availHeight;
    if (winHeight > deduct) {
        docElement.style.minHeight = `${winHeight - deduct}px`;
    }    
}