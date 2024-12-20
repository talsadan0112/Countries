
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
      // Create the main container
      const countryContainer = document.createElement('div');
      countryContainer.className = 'country-details';

      // Create the flag section
      const flagContainer = document.createElement('div');
      flagContainer.className = 'country-flag';
      const flagImage = document.createElement('img');
      flagImage.src = country.flag;
      flagImage.alt = `${country.name} Flag`;
      flagContainer.appendChild(flagImage);

      // Create the info section
      const infoContainer = document.createElement('div');
      infoContainer.className = 'country-info';

      // Add country name
      const countryTitle = document.createElement('h1');
      countryTitle.textContent = country.name;
      infoContainer.appendChild(countryTitle);

      // Add details
      const details = [
        { label: 'Population', value: country.population.toLocaleString() },
        { label: 'Region', value: country.region },
        { label: 'Capital', value: country.capital || 'N/A' }
      ];

      details.forEach(detail => {
        const detailElement = document.createElement('p');
        detailElement.innerHTML = `<strong>${detail.label}:</strong> ${detail.value}`;
        infoContainer.appendChild(detailElement);
      });

      // Nest flag and info into the main container
      countryContainer.appendChild(flagContainer);
      countryContainer.appendChild(infoContainer);

      // Add the container to the body
      document.body.appendChild(countryContainer);

      // Remove the loader if it exists
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.display = 'none';
      }
    } else {
      // If country is not found, display a message
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Country not found!';
      document.body.appendChild(errorMessage);
    }
  })
  .catch(error => {
    console.error('Error loading the JSON data:', error);
  });
