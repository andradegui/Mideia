let btn = document.querySelector(".fa-eye");

//Função de mostrar e esconder a senha
btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#userSenha'); 

  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text');
  }
  else{
    inputSenha.setAttribute('type', 'password');
  }
});

function entrar(){
  let email = document.querySelector('#userEmail');
  let labelUserEmail = document.querySelector('#labelUserEmail');

  let senha = document.querySelector('#userSenha');
  let labelUserSenha = document.querySelector('#labelUserSenha');

  let msgError = document.querySelector('#msgError');
  listaUser = [];

  let userValid = {
    nome: '',
    email: '',
    senha: ''
  }

  if(email.value == '' && senha.value == ''){
    
    labelUserEmail.setAttribute('style', 'color: #ba000d');
    email.setAttribute('style', 'border-color: #ba000d');
    labelUserSenha.setAttribute('style', 'border-color: #ba000d');
    senha.setAttribute('style', 'border-color: #ba000d');
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = '<strong>Email e senha não preenchidos</strong>';

    email.focus();

    return false;
  }

  listaUser = JSON.parse(localStorage.getItem('listaUser'));

  listaUser.forEach((item) => {
    if(email.value == item.emailCad && senha.value == item.senhaCad){

      userValid = {
        nome: item.nomeCad,
        email: item.emailCad,
        senha: item.senhaCad
      }
    }
  })

  if(email.value == userValid.email && senha.value == userValid.senha){    

    //Criando token para controle de acesso 
    let token = Math.random().toString(16).substr(4);
    localStorage.setItem('token', token);
    
    localStorage.setItem('userLogado', JSON.stringify(userValid));

    window.location.href = '../Views/feed.html';

  }else{

    labelUserEmail.setAttribute('style', 'color: #ba000d');
    email.setAttribute('style', 'border-color: #ba000d');
    labelUserSenha.setAttribute('style', 'border-color: #ba000d');
    senha.setAttribute('style', 'border-color: #ba000d');
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = '<strong>Email ou senha incorretos</strong>';

    email.focus();
  }

}







//Pegando id's do html para manipular elementos HTML



// function cadastraUser() {

// function cadastrarUser() {

//     let nome = document.getElementById("nome").value;
//     let email = document.getElementById("email").value;
//     let senha = document.getElementById("senha").value;
//     let cpf = document.getElementById("cpf").value;
//     let telefone = document.getElementById("telefone").value;

//     let user = {
//         nome: nome,
//         email: email,
//         senha: senha,
//         cpf: cpf,
//         telefone: telefone
//     };

//     var json = JSON.stringify(user);
//     localStorage.setItem(user, json);
//     console.log("user add")
// }

// function login() {
//     event.preventDefault();

//     let userEmail = document.getElementById("userEmail").value;
//     let userPass = document.getElementById("userPass").value;
//     let result = document.getElementById("result").value;

//     var userAutenticado = localStorage.getItem(user);
//     var dadosUser = JSON.parse(user);
//     console.log(data);

//     if (userAutenticado == null) {
//         result.innerHTML = 'Credenciais Erradas';
//     }
//     else if (userEmail == dadosUser.email && userPass == dadosUser.senha) {
//         window.location.href = '/Views/feed.html';
//     }
//     else {
//         result.innerHTML = 'Credenciais Erradas';
//     }

// }
