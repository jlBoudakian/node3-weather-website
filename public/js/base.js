console.log('Client side javascript is loaded');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            msgTwo.textContent = '';
            msgOne.textContent = '';

            if (data.error) {
                console.log(data.error);
                msgOne.textContent = data.error;
            } else {
                msgTwo.textContent = data.location + '. ' + data.forecast;
            }
        });
    });

    console.log(location);
})