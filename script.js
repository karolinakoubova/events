
// / Event class definition
class Event {
    constructor(id, name, date, description, image_url) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.description = description;
        this.image_url = image_url;
    }
    // Method to create an HTML card for the event
    createEventCard() {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.innerHTML = `
            <img src="${this.image_url}" alt="${this.name}">
            <div class="event-info">
            <div>
                <h3 class="event-name">${this.name}</h3>
                <p>${this.date}</p>
                <p>${this.description}</p>
            </div>
            <div>
                <button class="register-btn">REGISTER</button>
              </div>  
            </div>
        `;
        return eventCard;
    }
    }

    
// Fetching data from the API and populating the page
const loadData = async () => {
    try {
        const response = await fetch('https://test-api.codingbootcamp.cz/api/147c6eae/events');
        const data = await response.json();
        console.log(data)
        // Select the container where the event cards will go
        const eventsGrid = document.querySelector(".events-grid");
        data.splice(2,1)
        //removed Matthews fair
        data.forEach(eventData => {
            // Create an instance of Event for each event
            const event = new Event(
                eventData.id,
                eventData.name,
                eventData.date,
                eventData.description,
                eventData.image_url
            );
            // Create the HTML card using the method inside the Event class
            const eventCard = event.createEventCard();
            // Append the generated card to the container
            eventsGrid.appendChild(eventCard);

        });
    } catch (error) {
        console.error("Error fetching event data:", error);
    }
    const modal = document.getElementById("registerModal");
        // const btn = document.querySelector(".register-btn");
        const buttons = document.querySelectorAll(".register-btn")
        const span = document.getElementsByClassName("close")[0];
        // btn.onclick = function() {
        //     modal.style.display = "block";
        // }

        buttons.forEach((btn) => {
            btn.addEventListener('click', function(event) {
                event.preventDefault()
                modal.style.display = "block"
            });
        });

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }

        document.getElementById("registrationForm").onsubmit = function(event) {
            event.preventDefault();

            const formData = new FormData(this);
            
            const apiUrl = "https://test-api.codingbootcamp.cz/api/9c7ab652/events/1/registrations"; 

            fetch(apiUrl, {
                method: "POST",
                body: formData,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                modal.style.display = "none";
                alert('Registration successful!');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was a problem with your registration. Please try again.');
            });
        };
}
// Call the function to load data when the page is ready
loadData();

// I TRANSFERED THE MODAL INTO THE LOADDATA FUNCTION

