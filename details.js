
// Fetch the JSON data
fetch('./CountriesData.json')
  .then(response => response.json())
  .then(countries => {
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('country');

    const country = countries.find(c => 
      c.name.toLowerCase() === countryName.toLowerCase()
    );

    // If the country is found, display its details
    if (country) {
      const countryContainer = document.createElement('div');
      countryContainer.className = 'country-details';

      const flagContainer = document.createElement('div');
      flagContainer.className = 'country-flag';
      const flagImage = document.createElement('img');
      flagImage.src = country.flag;
      flagImage.alt = `${country.name} Flag`;
      flagContainer.appendChild(flagImage);

      const infoContainer = document.createElement('div');
      infoContainer.className = 'country-info';

      const countryTitle = document.createElement('h1');
      countryTitle.textContent = country.name;
      infoContainer.appendChild(countryTitle);

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

      countryContainer.appendChild(flagContainer);
      countryContainer.appendChild(infoContainer);

      document.body.appendChild(countryContainer);

      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.display = 'none';
      }
    } else {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Country not found!';
      document.body.appendChild(errorMessage);
    }
  })
  .catch(error => {
    console.error('Error loading the JSON data:', error);
  });
