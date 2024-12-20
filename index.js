fetch('CountriesData.json')
  .then((response) => response.json())
  .then((countries) => {
    const countriesContainer = document.getElementById('countries-g');
    if (!countriesContainer) {
      console.error('countries-g container not found in the DOM!');
      return;
    }

    // global variable
    let allCountries = countries;

    // view the countries
    function displayCountries(countriesToDisplay) {
      countriesContainer.innerHTML = ''; //cleaning all the current HTML in the div
      countriesToDisplay.forEach((country) => {
        const countryDiv = document.createElement('div');
        countryDiv.className = 'country';

        const countryLink = document.createElement('a');
        countryLink.href = `details.html?country=${(country.name)}`;

        countryLink.innerHTML = `
          <div class="country-flag">
            <img src="${country.flag}" alt="${country.name} Flag">
          </div>
          <div class="country-info">
            <h2>${country.name}</h2>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
          </div>
        `;

        countryDiv.appendChild(countryLink);
        countriesContainer.appendChild(countryDiv);
      });
    }

    displayCountries(allCountries);

    // Filter by input
    function filteredCountriesByInput() {
      const filterText = document.getElementById('country-filter').value.toLowerCase();

      // Filter the countries based on the input
      const filteredCountries = allCountries.filter(country =>
        country.name.toLowerCase().includes(filterText) || // Match for name
        country.capital.toLowerCase().includes(filterText) || // Match for capital
        country.population.toString().includes(filterText) || // Match population
        country.region.toLowerCase().includes(filterText) // Match region
      );

      // Display the filtered results
      displayCountries(filteredCountries);
    }

    // Add event listener to the input field
    document.getElementById('country-filter').addEventListener('input', filteredCountriesByInput);

    // filter by region
    const filterItems = document.querySelectorAll('#dropdown-wrapper ul li');
    filterItems.forEach((item) => {
      item.addEventListener('click', () => {
        const region = item.getAttribute('data-region');

        let filteredCountries;
        if (region === 'all') {
          filteredCountries = allCountries;
        } else {
          filteredCountries = allCountries.filter((country) => {
            return country.region.toLowerCase() === region;
          });
        }

        // the output
        if (filteredCountries.length === 0) {
          countriesContainer.innerHTML = '<p>No countries found.</p>';
        } else {
          displayCountries(filteredCountries);
        }

        // close the menu after the choice
        document.getElementById('dropdown-wrapper').classList.remove('open');
      });
    });
  })
  .catch((error) => {
    console.error('Error loading the JSON data:', error);
  });

// open the menu of the filter
document.addEventListener('DOMContentLoaded', function () {
  const dropdownHeader = document.getElementById('dropdown-header');
  const dropdownWrapper = document.getElementById('dropdown-wrapper');

  dropdownHeader.addEventListener('click', function () {
    dropdownWrapper.classList.toggle('open');
  });
});
