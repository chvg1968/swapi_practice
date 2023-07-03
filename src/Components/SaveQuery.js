export function saveQuery(query, endpoint, isModal = false, timestamp = null) {
  const queryObj = {
    query: query,
    endpoint: endpoint,
    timestamp: timestamp || new Date().getTime(),
    isModal: isModal
  };

  const previousQueries = JSON.parse(localStorage.getItem('queries')) || [];
  previousQueries.push(queryObj);
  localStorage.setItem('queries', JSON.stringify(previousQueries));

  displayQuery(query, endpoint, queryObj.timestamp);
}

export function displayQuery() {
  const queries = JSON.parse(localStorage.getItem('queries')) || [];

  const queryHistory = document.getElementById('query-history');
  queryHistory.innerHTML = ''; // Clear existing content

  queries.forEach(queryObj => {
    const formattedTimestamp = new Date(queryObj.timestamp).toLocaleString();
    const li = document.createElement('li');
    li.textContent = `${queryObj.query} ${queryObj.endpoint} (timestamp: ${formattedTimestamp})`;
    queryHistory.appendChild(li);
  });
}

 
window.addEventListener('DOMContentLoaded', displayQuery);

export { saveQuery, displayQuery }; 
