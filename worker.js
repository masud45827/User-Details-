fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(data => postMessage(data))
  .catch(error => console.error('Error fetching data:', error));