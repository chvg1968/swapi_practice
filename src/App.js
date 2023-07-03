import { SearchInput } from "./Components/SearchInput.js";
import { showDetails, closeModal } from "./Components/Modal.js";
import { renderSearchResults } from "./Components/SearchResults.js";
import { saveQuery } from "./Components/SaveQuery.js";

const endpoints = ["films", "people", "planets", "starships"];
const customTimestamp = new Date().toLocaleString();
let isModalOpen = false;
const BASE_URL = "https://swapi.dev/api/"; 

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

  let url = `${BASE_URL}${endpoint}/`;
  if (query) {
    url += `?search=${encodeURIComponent(query)}`;
  }

  const resultsContainer = document.querySelector(".search-results");
  resultsContainer.innerHTML = "";
  resultsContainer.classList.add("loading");

  return fetchData(url)
    .then((data) => {
      console.log(data);
      renderSearchResults(data, (result)=>{
        showDetails(result);
        isModalOpen = true;
        console.log("Modal window opening");
        resultsContainer.classList.add("loading");
        saveQuery(query, endpoint, isModalOpen, customTimestamp); 
      });
      // Register modal open event in local storage
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
  // isModalOpen = false; // Reset the modal state
  searchSwapi(endpoint, query);
}

const searchLinks = document.querySelectorAll(".search-link");
searchLinks.forEach((link) => {
  link.addEventListener("click", handleSearchLinkClick);
});

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => {
  closeModal();
  isModalOpen = false; // Reset the modal state to closed
  console.log("Modal window closing");
  const resultsContainer = document.querySelector(".search-results");
  resultsContainer.classList.remove("loading");
});

SearchInput(searchSwapi);
