const username = document.getElementById("username");
const password = document.getElementById("password");
const button = document.getElementById("loginButton");

function callLogin(){
    event.preventDefault()
    PoziviAjax.postLogin(username.value, password.value, login)
}
button.addEventListener('click',callLogin);

function login(error,data){
    if(error) {
        throw error;
    }
    window.location.href = 'http://localhost:3000/nekretnine.html'
}