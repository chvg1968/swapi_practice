export function renderSearchResults(searchResults, showDetails) {
    const resultsContainer = document.querySelector(".search-results");
    resultsContainer.innerHTML = "";
  
    // Check if there are no results
    if (searchResults.length === 0) {
      resultsContainer.textContent = "No se encontraron resultados.";
      return;
    }
  
    const ul = document.createElement("ul");
    searchResults.forEach((result) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = result.name || result.title;
      link.href = "#";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        showDetails(result);
      });
  
      li.appendChild(link);
      ul.appendChild(li);
    });
  
    resultsContainer.appendChild(ul);
  }
  