import Notiflix from 'notiflix';

export function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
      Notiflix.Notify.failure('Oops, there was an error. Please try again later.');
    });
}
