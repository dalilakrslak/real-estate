const username = document.getElementById("username");
const password = document.getElementById("password");
const button = document.getElementById("loginButton");

button.addEventListener('click', function (event) {
    event.preventDefault()
    PoziviAjax.postLogin(username.value, password.value, login)
});

function login(error,data){
    if(error) {
        throw error;
    }
    window.location.href = 'http://localhost:3000/nekretnine.html'
}