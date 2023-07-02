export function saveQuery(query, isModal = false, timestamp = null) {
  const queryObj = {
    query: query,
    timestamp: timestamp || new Date().getTime(),
    isModal: isModal
  };

  const previousQueries = JSON.parse(localStorage.getItem('queries')) || [];
  previousQueries.push(queryObj);
  localStorage.setItem('queries', JSON.stringify(previousQueries));

  displayQuery(query, queryObj.timestamp);
}

export function displayQuery(query, timestamp) {
  if (document.location.pathname === '/query-history.html') {
    const formattedTimestamp = new Date(timestamp).toLocaleString();
    const li = document.createElement('li');
    li.textContent = `${query} (timestamp: ${formattedTimestamp})`;
    const queryHistory = document.getElementById('query-history');
    queryHistory.appendChild(li);
  }
}

