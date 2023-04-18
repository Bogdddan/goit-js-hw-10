import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.getElementById('search-box');
const div = document.querySelector('.country-info');
const ul = document.querySelector('.country-list');

// ставим затримку 300мс щоб часто не оновлювався інпут
const debounceSearch = debounce(() => {
  const searchQuery = input.value.trim();

  if (searchQuery !== '') {
    fetchCountries(searchQuery)
      .then(countries => {
        console.log(countries);
        renderPage(countries);
      })
      .catch(error => console.error('Error:', error));
  } else {
    ul.innerHTML = '';
    div.innerHTML = '';
  }
}, DEBOUNCE_DELAY);

input.addEventListener('input', debounceSearch);

function renderPage(countries) {
  const countryCount = countries.length;

  if (countryCount > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    ul.innerHTML = '';
    div.innerHTML = '';
  } else if (countryCount > 1) {
    const countryList = countries
      .map(country => {
        const { name: { common }, flags: { svg } } = country;
        return `<li class="country-item"><img src="${svg}" alt="${common}" class="flag-image">${common}</li>`;
      })
      .join('');
    ul.innerHTML = countryList;
    div.innerHTML = '';
  } else {
    const [country] = countries;
    const { name: { common }, capital, population, languages, flags: { svg } } = country;
    ul.innerHTML = `<p class="country-name"><img src="${svg}" class="photo"/>${common}</p>`;
    div.innerHTML = `
      <p><div class="infor">Capital :</div> ${capital ?? 'N/A'}</p>
      <p><div class="infor">Population :</div> ${population ?? 'N/A'}</p>
      <p><div class="infor">Languages :</div> ${Object.values(languages ?? {}).join(', ') || 'N/A'}</p>
    `;
  }
}
