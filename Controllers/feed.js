let userLogado = JSON.parse(localStorage.getItem('userLogado'));

let logado = document.querySelector('.logado');
let nameUser = document.querySelector('.nameUser');

logado.innerHTML = userLogado.nome;
nameUser.innerHTML = userLogado.nome;

//Serve para ter o controle de acesso ao feed
if(localStorage.getItem('token') == null){
    alert('Você precisa estar logado para acessar essa págin');
    window.location.href = '../Views/login.html';
}

//Excluir token de controle de acesso
function sair(){
    localStorage.removeItem('token');
    localStorage.removeItem('userLogado');
    window.location.href = '../Views/login.html';
}