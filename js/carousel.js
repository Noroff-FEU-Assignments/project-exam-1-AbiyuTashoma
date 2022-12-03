const carouselListContainer = document.querySelector(".carousel-list");
const prevContainer = document.querySelector(".previuos");
const nextContainer = document.querySelector(".next");

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let startIndex = 0;

function display () {
    let html = "";

    for (let i = 0; i < 4; i++) {
        if ((startIndex) >= list.length) {
            startIndex = 0;
            console.log("reset");
        }

        html += `<p>${list[startIndex]}</p>`;
        console.log("index: " + (startIndex));
        console.log("value: " + (list[startIndex]));

        startIndex += 1;
    }

    carouselListContainer.innerHTML = html;
}

function displayPreviuos () {
    let html = "";

    for (let i = 0; i < 4; i++) {
        startIndex -= 1;

        if ((startIndex) < 0) {
            startIndex = list.length - 1;
            console.log("reset");
        }

        html += `<p>${list[startIndex]}</p>`;
        console.log("index: " + (startIndex));
        console.log("value: " + (list[startIndex]));

    }

    carouselListContainer.innerHTML = html;
}

display();

function next() {
    display();
}

nextContainer.addEventListener("click", next);

// function previuos() {
//     displayPreviuos();
// }

// prevContainer.addEventListener("click", displayPreviuos);
