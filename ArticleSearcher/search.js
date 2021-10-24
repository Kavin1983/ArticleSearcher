const apiKey = "5Gvidzwg4X0Qv8S6uVR0zfvwUIGwc7l2";
const searchInput = document.querySelector(".searchInput");
const searchButton = document.querySelector(".searchButton");
const mainContent = document.querySelector(".mainContent");

const renderArticles = function (articles) {
  const markup = articles
    .map(function (a) {
      let date = new Date(a.pub_date).toLocaleDateString();
      if (date === new Date().toLocaleDateString()) {
        date = `${date}     (Today)`;
      }

      return `
    <div class="article">
      <h1 class="article-title">${a.headline.main}</h1>
      <div class="article-info">
        <div>
          <span class="article-date">${date}</span>
          <p class="article-lead">${a.lead_paragraph}</p>
        </div>
        <a class="article-link" href="${a.web_url}" target="_blank">
          <img class="article-image" src="${
            a?.multimedia[0]?.url
              ? "http://www.nytimes.com/" + a.multimedia[0].url
              : "questionmark.png"
          }">
        </a>
      </div>
    </div>
    `;
    })
    .join("");
  mainContent.innerHTML = "";
  mainContent.insertAdjacentHTML("afterbegin", markup);
};

const fetchData = async function (value) {
  const response = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${value}&api-key=${apiKey}`
  ).then((res) => res.json());

  const articles = response.response.docs;
  console.log(articles);
  renderArticles(articles);
};

searchButton.addEventListener("click", async function (e) {
  e.preventDefault();
  fetchData(searchInput.value);
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

window.addEventListener("load", function (e) {
  fetchData("");
});
