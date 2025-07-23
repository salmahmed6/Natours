/* eslint-discard */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

//DOM elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form'); 
const logOutBtn = document.querySelector('.nav_el--logout');
const updatePasswordForm = document.querySelector('.form-user-password');

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

if(logOutBtn) logOutBtn.addEventListener('click', logout);

if(userDataForm) {
    userDataForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        updateSettings({name, email}, 'data');
    });
}


if(userPasswordForm) {
    userPasswordForm.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.btn--save-password').textContent = 'Updating...';

        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        await updateSettings(
            {passwordCurrent , password, passwordConfirm },
            'password'
        );

        document.querySelector('.btn--save-password').textContent = 'Save Password';
        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
    });
}