import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.getElementById('search-box');

// ставим затримку 300мс щоб часто не оновлювався інпут
const debounceSearch = debounce(fetchCountries , DEBOUNCE_DELAY);
input.addEventListener('input' , debounceSearch);
//

function fetchCountries() {

    const handleSearch = input.value;

    if (handleSearch = "") {
        return 
    }

    return fetch(`https://restcountries.com/v3.1/name/${handleSearch} `)
    .then(response => {
        return response.json()
    })
    .then(countries => {
        console.log(countries);
        const div = document.querySelector('.country-info');
        const ul = document.querySelector('.country-list')
        const capital = countries.map(country => country.capital);
        const population = countries.map(country => country.population);
        const languages = countries.map(country => country.languages).flat();
        const countryName = countries.map(country => country.name);
        const countryFlag = countries.map(country => country.flags.png);
        ul.innerHTML=`<p><img src=${countryFlag} alt=${countryName}/>${countryName}</p>`
        div.innerHTML = `
        <p>Capi: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${languages}</p>
        `;
    })
    .catch(error => {
        console.log(error)
    })
};


// 
// 
// 
// 
// 
function errorFunc() {
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
};

// fetch(`https://restcountries.com/v3.1/name/deutschland`).then(r => {
//     return r.json()
// }).then(countries => {
//     console.log(countries)
// }).catch(error => {
//     console.log(error)
// })

//.map(return `
//           <p>Capital {{capital}}</p>
//               <p>Population {{population}}</p>
//                   <p>Languages {{languages}}</p>
//`)