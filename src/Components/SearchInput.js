export function SearchInput(searchSwapi) {
    const searchInput = document.querySelector(".search-input");
  
    searchInput.addEventListener("input", (event) => {
      const query = event.target.value.trim();
      searchSwapi(query);
    });
  }

  