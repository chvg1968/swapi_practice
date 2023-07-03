import { SearchInput } from "./Components/SearchInput.js";
import { showDetails } from "./Components/Modal.js";
import { renderSearchResults } from "./Components/SearchResults.js";
import { saveQuery } from "./Components/SaveQuery.js";

const endpoints = ["films", "people", "planets", "starships"];

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}


function searchSwapi(endpoint, query) {
  if (!query && !endpoints.includes(endpoint)) {
    return;
  }

  let url = `https://swapi.dev/api/${endpoint}/`;
  if (query) {
    url += `?search=${encodeURIComponent(query)}`;
  }

  const resultsContainer = document.querySelector(".search-results");
  resultsContainer.innerHTML = "";
  resultsContainer.classList.add("loading");

  return fetchData(url)
    .then((data) => {
      console.log(data);
      renderSearchResults(data, showDetails);
      const customTimestamp = new Date().toLocaleString();
      saveQuery(query, endpoint, false, customTimestamp);
      return data;
    })
    .catch((error) => {
      console.error("Error searching SWAPI:", error);
      return [];
    })
    .finally(() => {
      resultsContainer.classList.remove("loading");
    });
}

function handleSearchLinkClick(event) {
  event.preventDefault();
  const searchInput = document.querySelector(".search-input");
  const query = searchInput.value.trim();
  const endpoint = event.target.dataset.endpoint; 
  const isModal = true; 
  searchSwapi(endpoint, query, isModal);
}

SearchInput(searchSwapi);

const searchLinks = document.querySelectorAll(".search-link");
searchLinks.forEach((link) => {
  link.addEventListener("click", handleSearchLinkClick);
});



