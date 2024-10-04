
const eventName = document.querySelector(".event-name")
// fetching data from the api
const loadData = async () => {
    const response = await fetch('https://test-api.codingbootcamp.cz/api/147c6eae/events');
    const data = await response.json();
console.log(data)
 eventName.innerHTML = data[1].name
 
}

loadData()






