/* eslint-discard */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';

//DOM elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form'); 
const logOutBtn = document.querySelector('.nav_el--logout');

// delegation
if(mapBox){
    const locations = JSON.parse(document.getElementById('map').dataset.locations);
    displayMap(locations);
}


if(loginForm){
    loginForm.querySelector('.form').addEventListener('submit', e=> {
        e.preventDefault();
        const email = document.querySelector('email').value;
        const password = document.querySelector('password').value;
        login( email, password );
    })
}

if(logOutBtn) logOutBtn.addEventListener('click', logout)