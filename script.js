const NASA_Api_Key = "0nZRUdJtWTKcsLN5O4ndprz01tNwl5dbyERclpIF";

const input = document.querySelector("input");
input.max = new Date().toLocaleDateString("en-ca");

input.addEventListener("change", (event) => {
  getAPOD(event.target.value);
});

const getAPOD = (date) => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_Api_Key}&date=${date}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Date must be between 1995-06-16 and ${new Date().toLocaleDateString(
            "en-ca"
          )}`
        );
      }

      return res.json();
    })
    .then((data) => {
      displayAPOD(data);
      console.log(data);
    })
    .catch((error) => displayError(error));
};

const displayAPOD = (data) => {
  const APODcard = document.querySelector("div.apod");
  if (data.media_type == "video") {
    APODcard.innerHTML = `
    <h3 class="adop-title">${data.title}</h3>
    <iframe width="420" height="315"
    src="${data.url}">
    </iframe>
    <h2 class="hh">explanation</h2>
    <p class="pp">${data.explanation}</p>`;
  } else {
    APODcard.innerHTML = `
    <h3 class="adop-title">${data.title}</h3>
    <img src="${data.url}" title="${data.title}" class="pic"/>
    <h2 class="hh">explanation</h2>
    <p class="pp">${data.explanation}</p>
    `;
  }
};

const displayError = (error) => {
  const APODcard = document.querySelector("div.apod");
  APODcard.innerHTML = `
      <h3 class="adop-title">${error}</h3>
      `;
};
