function displayQueries() {
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
  
  window.addEventListener('DOMContentLoaded', displayQueries);
  
  