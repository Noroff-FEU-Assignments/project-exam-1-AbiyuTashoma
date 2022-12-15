const aboutMeContainer = document.querySelector(".about-me");

const aboutURL = "https://www.myblog.casa/wp-json/wp/v2/pages/?slug=about-me";

async function getAboutMe () {
    aboutMeContainer.innerHTML = `<div class="loading"></div>`;

    try {
        aResponse = await fetch(aboutURL);
        aboutMe = await aResponse.json();

        aboutMeContainer.innerHTML = `<h1>${aboutMe[0]["title"]["rendered"]}</h1>
                                        ${aboutMe[0]["content"]["rendered"]}`;
    }

    catch (error) {
        aboutMeContainer.innerHTML = displayMessage("An error ocurred!", "error");
    }
}

getAboutMe ();