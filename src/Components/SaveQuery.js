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

export function displayQuery(query, endpoint, timestamp) {
  if (document.location.pathname === '/src/query-history.html') {
    const formattedTimestamp = new Date(timestamp).toLocaleString();
    const li = document.createElement('li');
    li.textContent = `${query} (endpoint: ${endpoint}, timestamp: ${formattedTimestamp})`;
    const queryHistory = document.getElementById('query-history');
    queryHistory.appendChild(li);
  }
}
