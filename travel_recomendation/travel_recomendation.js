document.querySelector('.search-bar button').addEventListener('click', function () {
    const searchText = document.querySelector('.search-bar input').value.toLowerCase();
    const dropdown = document.getElementById('dropdown');
    const value = dropdown.value;


    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            if (value === "beaches") {
                const destination = data.beaches.filter(item => item.name.toLowerCase().includes(searchText));
                const container = document.getElementById('destination-container');
                container.innerHTML = createDestinationHTML(destination);

            }
            else if (value === "countries") {
                console.log(data);
                const destination = data.countries.filter(item => item.name.toLowerCase().includes(searchText));
                const container = document.getElementById('destination-container');
                container.innerHTML = createDestinationHTML(destination);

            }
            else {
                const destination = data.temples.filter(item => item.name.toLowerCase().includes(searchText));
                const container = document.getElementById('destination-container');
                container.innerHTML = createDestinationHTML(destination);
            }

        })
        .catch(error => console.error('Error fetching data:', error));
});

document.querySelector('.search-bar button:last-child').addEventListener('click', function () {
   document.querySelector('.search-bar input').value = '';

});


function createDestinationHTML(destination) {
    const div = document.getElementById('destination-container');
    if (destination.length > 0) {
   
        div.style.display='block';
    }
    else{
        div.style.display='none';
        alert("Destinations not found!")
    }

 
    let destinationsResult = ''
    for (let i = 0; i < destination.length; i++) {
       let div =  ` <div class="destination">
         <h2>${destination[i].name}</h2>
            <img src="${destination[i].imageUrl}" alt="${destination.name}">
            <p>${destination[i].description}</p> 
         </div>`;

         destinationsResult +=div;
     
    }

    return destinationsResult;


}