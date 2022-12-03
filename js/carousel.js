const carouselListContainer = document.querySelector(".carousel-list");
const prevContainer = document.querySelector(".previuos");
const nextContainer = document.querySelector(".next");

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let startIndex = 0;
let endIndex = list.length - 4;

function display (start = 0) {
    let html = "";

    for (let i = 0; i < 4; i++) {

        html += `<p>${list[start]}</p>`;

        start += 1;

        if (start >= list.length) {
            start = 0;
        }
        
    }

    startIndex = start;

    carouselListContainer.innerHTML = html;
    console.log("start: " + start);
    console.log("startIndex: " + startIndex);
    console.log("endIndex: " + endIndex);
    console.log("list: " + list);
}

function displayPreviuos (pStart = 0) {
    let html = "";

    for (let i = 0; i < 4; i++) {

        html += `<p>${list[pStart]}</p>`;

        pStart += 1;
        endIndex -= 1;

        if (pStart >= list.length) {
            pStart = 0;
        }

        if (endIndex < 0) {
            endIndex = list.length - 1;
        }
    }

    carouselListContainer.innerHTML = html;

    console.log("pStart: " + pStart);
    console.log("startIndex: " + startIndex);
    console.log("endIndex: " + endIndex);
    console.log("list: " + list);
}

function next() {
    endIndex = startIndex;
    display(startIndex);
}

function previuos() {
    startIndex = endIndex;
    displayPreviuos(endIndex);
}

display();
nextContainer.addEventListener("click", next);
prevContainer.addEventListener("click", previuos);
