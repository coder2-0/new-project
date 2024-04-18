var propertyRatings = {}; // Object to store ratings for each property
var ratingContainers = {}; // Keep track of rating containers for each property

function filterProperties() {
    var searchInput = document.getElementById('searchBar').value.toLowerCase();
    var properties = document.querySelectorAll('#property-list li');

    properties.forEach(function(property) {
        var propertyName = property.textContent.toLowerCase();
        if (propertyName.includes(searchInput)) {
            property.style.display = "block";
        } else {
            property.style.display = "none";
        }
    });
}

function showDetails(element) {
    var details = document.getElementById('details');
    details.style.display = "block";
    
    var propertyName = element.textContent;
    document.getElementById('detailName').textContent = "Name: " + propertyName;
    document.getElementById('detailLocation').textContent = "Location: Example Location";
    document.getElementById('detailContact').textContent = "Contact: 123-456-7890";

    if (!ratingContainers[propertyName]) {
        var ratingContainer = document.createElement('div');
        ratingContainer.innerHTML = `
            <p>Rating: <span id="rating_${propertyName}">${propertyRatings[propertyName] || 'N/A'}</span></p>
            <input type="number" id="ratingInput_${propertyName}" min="1" max="5" placeholder="Rate (1-5)">
            <button onclick="rateProperty('${propertyName}')">Rate</button>
        `;
        ratingContainers[propertyName] = ratingContainer;
    }

    details.innerHTML = ''; // Clear previous details
    details.appendChild(ratingContainers[propertyName]);

    var hideButton = document.createElement('button');
    hideButton.textContent = "Hide Details";
    hideButton.onclick = hideDetails;
    details.appendChild(hideButton);
}

function rateProperty(propertyName) {
    var ratingInput = document.getElementById(`ratingInput_${propertyName}`);
    var rating = parseInt(ratingInput.value);
    if (isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a valid rating between 1 and 5.");
        return;
    }
    if (propertyRatings.hasOwnProperty(propertyName)) {
        alert("You have already rated this property.");
        ratingInput.disabled = true; // Disable the rating input
        return;
    }
    propertyRatings[propertyName] = rating;
    document.getElementById(`rating_${propertyName}`).textContent = rating;
    ratingInput.disabled = true; // Disable the rating input after submission
    ratingInput.nextElementSibling.disabled = true; // Disable the rate button after submission
}

function hideDetails() {
    document.getElementById('details').style.display = "none";
}

function sortProperties(order) {
    var propertyListElement = document.getElementById('property-list');
    var properties = Array.from(propertyListElement.children);

    properties.sort(function(a, b) {
        var priceA = parseFloat(a.textContent.match(/\d+/)[0]);
        var priceB = parseFloat(b.textContent.match(/\d+/)[0]);

        if (order === 'asc') {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });

    properties.forEach(function(property) {
        propertyListElement.appendChild(property);
    });
}
