const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const searchLocation = (location) => {
  search.value = '';
  messageOne.textContent = '';
  messageTwo.textContent = 'Loading.....';

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageTwo.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
};

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  searchLocation(location);
});
