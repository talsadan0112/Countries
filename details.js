

// Fetch the JSON data
fetch('./CountriesData.json')
  .then(response => response.json())
  .then(countries => {
    // Get the country name from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('country');

    // Find the country in the data
    const country = countries.find(c => 
      c.name.toLowerCase() === countryName.toLowerCase()
    );

    // If the country is found, display its details
    if (country) {
     
      const countryDetails = document.getElementById('country-name');
      countryDetails.innerHTML = `
        <h2>${country.name}</h2>
        <img src="${country.flag}" alt="${country.name} Flag" width="100" />
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
      `;

      // remove the loader if the country is found 
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.display = 'none'; 
      }

    } else {
      // If country is not found, display a message
      document.getElementById('country-name').innerHTML = "<p>Country not found!</p>";
    }
  })
  .catch(error => {
    console.error('Error loading the JSON data:', error);
  });
