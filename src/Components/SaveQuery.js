export function saveQuery(query, endpoint, isModal=false, timestamp = null) {
  const queryObj = {
    query: query,
    endpoint: endpoint,
    timestamp: timestamp || new Date().getTime(),
    isModal: isModal
  };

  const previousQueries = JSON.parse(localStorage.getItem('queries')) || [];
  previousQueries.push(queryObj);
  localStorage.setItem('queries', JSON.stringify(previousQueries));

  displayQuery();
}

export function displayQuery() {
  const queries = JSON.parse(localStorage.getItem('queries')) || [];

  const queryHistory = document.getElementById('query-history');
  if (!queryHistory) return; // Check if element exists before updating

  queryHistory.innerHTML = ''; // Clear existing content

  queries.forEach(queryObj => {
    const formattedTimestamp = new Date(queryObj.timestamp).toLocaleString();
    const li = document.createElement('li'); 
    li.textContent = `${queryObj.query} ${queryObj.endpoint} ${queryObj.isModal} (timestamp: ${formattedTimestamp})`;
    queryHistory.appendChild(li);
  });
}

window.addEventListener('DOMContentLoaded', displayQuery);
