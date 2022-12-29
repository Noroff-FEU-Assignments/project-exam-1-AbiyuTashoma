const stickyMenuContainer = document.querySelector("header");

stickyMenuContainer.style.display = "block";

let startPosition = 30;
const scrollRange = -10;

function detectScroll () {
    const currentPosition = window.scrollY;

    if (currentPosition  < 2) {
        viewSticky();
    }

    else if (currentPosition > 220) {
        if ((currentPosition - startPosition) < scrollRange) {
            viewSticky();
        }

        else if ((currentPosition - startPosition) >= 5) {
            hideSticky();
        }
    }

    startPosition = window.scrollY;
}

function hideSticky() {
    stickyMenuContainer.style.display = "none";
}

function viewSticky() {
    const stickyStatus = stickyMenuContainer.style.display;
    if (stickyStatus == "none") {
        stickyMenuContainer.style.display = "block";
    }
}

document.addEventListener("scroll", detectScroll);