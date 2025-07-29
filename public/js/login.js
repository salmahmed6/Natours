<<<<<<< HEAD
/* eslint-disable */

const login = (email, password) => {
    
};

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login({email, password});
});
=======
import axios from "axios";
import { showAlert } from "./alerts";

export const login = async(email, password )=> {
    try{
        const res= await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/users/login',
        data: {
            email,
            password
        }
    });

    if(res.data.status === 'sucess') {
        showAlert('success','Logged in successfuly!');
        window.setTimeout(()=> {
            location.assign('/');
        },1500);
    }
    } catch(error) {
        showAlert('error',error.res.data.message);
    }
    
};

export const logout = async () => {
    try {
        const res= await axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/api/v1/users/logout',
        });

        if(res.data.status === 'success') {
            location.reload(true);
        }

    } catch (error) {
        showAlert('error', 'Error logging out! try again')
    }
}
>>>>>>> 7a47995a277e4b6c78763627d44aeb0743a09256
