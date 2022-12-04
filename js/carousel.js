const carouselListContainer = document.querySelector(".carousel-list");
const prevContainer = document.querySelector(".previuos");
const nextContainer = document.querySelector(".next");

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let startIndex = 0;
let endIndex = list.length;

function display () {
    let html = "";

    for (let i = 0; i < 4; i++) {

        html += `<p>${list[i]}</p>`;

        startIndex += 1;
        endIndex -= 1;
    }

    carouselListContainer.innerHTML = html;
}

function displayNext (start = 0) {
    let html = "";

    for (let i = 0; i < 4; i++) {

        html += `<p>${list[start]}</p>`;

        start += 1;
        endIndex += 1;

        if (endIndex >= list.length) {
            endIndex = 0;
        }

        if (start >= list.length) {
            start = 0;
        }
        
    }

    startIndex = start;

    carouselListContainer.innerHTML = html;
}

function displayPreviuos (pStart = 0) {
    let html = "";

    for (let i = 0; i < 4; i++) {

        html += `<p>${list[pStart]}</p>`;

        pStart += 1;
        endIndex -= 1;
        startIndex -= 1;
        
        if (startIndex < 0) {
            startIndex = list.length -1;
        }

        if (pStart >= list.length) {
            pStart = 0;
        }

        if (endIndex < 0) {
            endIndex = list.length - 1;
        }
    }

    carouselListContainer.innerHTML = html;
}

function next() {
    displayNext(startIndex);
}

function previuos() {
    displayPreviuos(endIndex);
}

display();
nextContainer.addEventListener("click", next);
prevContainer.addEventListener("click", previuos);
