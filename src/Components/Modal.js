import { saveQuery } from "./SaveQuery.js";

export async function showDetails(result) {
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-details");
  modalContent.innerHTML = "";

  if (result.name) {
    const name = document.createElement("h2");
    name.textContent = result.name;
    modalContent.appendChild(name);
  }

  if (result.title) {
    const title = document.createElement("h2");
    title.textContent = result.title;
    modalContent.appendChild(title);
  }

  for (const key in result) {
    if (key !== "name" && key !== "title") {
      const label = document.createElement("strong");
      label.textContent = `${key}: `;

      const value = document.createElement("span");

      if (Array.isArray(result[key])) {
        const names = await getNamesFromUrls(result[key]);
        value.textContent = names.join(", ");
      } else {
        value.textContent = result[key];
      }

      const lineBreak = document.createElement("br");

      modalContent.appendChild(label);
      modalContent.appendChild(value);
      modalContent.appendChild(lineBreak);
    }
  }

  modal.style.display = "block";

  const closeBtn = document.getElementsByClassName("close")[0];
  closeBtn.addEventListener("click", () => {
    const queryInput = document.querySelector(".search-input");
    const query = queryInput.value.trim();
    saveQuery(query, true); // Call saveQuery to store the query in local storage
    closeModal(); // Call the closeModal function to hide the modal
  });
}

async function getNamesFromUrls(urls) {
  const promises = urls.map(async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.name || data.title;
  });

  const names = await Promise.all(promises);
  return names;
}

export function closeModal() {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
}
