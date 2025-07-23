/* eslint-discard */

const login = async(email, password )=> {
    console.log(email, password);
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
        alert('Logged in successfuly!');
        window.setTimeout(()=> {
            location.assign('/');
        },1500);
    }
    } catch(error) {
        alert(error.res.data.message);
    }
    
}

document.querySelector('.form').addEventListener('submit', e=> {
    e.preventDefault();
    const email = document.querySelector('email').value;
    const password = document.querySelector('password').value;
    login({ email, password });
})