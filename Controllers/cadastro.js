//Pegando dados do HTML
let btn = document.querySelector(".fa-eye");

let labelNome = document.querySelector("#labelNome");
let nome = document.querySelector("#nome");
let validNome = false;

let labelEmail = document.querySelector("#labelEmail");
let email = document.querySelector("#email");
let validEmail = false;

let labelSenha = document.querySelector("#labelSenha");
let senha = document.querySelector("#senha");
let validSenha = false;

let labelCpf = document.querySelector("#labelCPF");
let cpf = document.querySelector("#cpf");
let validCpf = false;

let labelCelular = document.querySelector("#labelCelular");
let celular = document.querySelector("#celular");
let validCel = false;

let msgErro = document.querySelector("#msgErro");
let msgSuccess = document.querySelector("#msgSuccess");

//Função de mostrar e esconder a senha
btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha');

  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text');
  }
  else {
    inputSenha.setAttribute('type', 'password');
  }
});

//Validação de nome
nome.addEventListener("keyup", () => {
  if (nome.value.length <= 2 || nome.value.length == 0) {
    labelNome.setAttribute("style", "color: #ba000d;");
    labelNome.innerHTML = "Nome *Mínimo 3 caracteres";
    nome.setAttribute("style", "border-color: #ba000d;");
    validNome = false;
  } else if (nome.value.length > 50) {
    labelNome.setAttribute("style", "color: #ba000d;");
    labelNome.innerHTML = "Nome *Máximo 50 caracteres";
    nome.setAttribute("style", "border-color: #ba000d;");
    validNome = false;
  } else {
    labelNome.setAttribute("style", "color:#76ff03;");
    labelNome.innerHTML = "Nome";
    nome.setAttribute("style", "border-color: #76ff03;");
    validNome = true;
  }
});

//Validação email
email.addEventListener("keyup", () => {
  if (email.value.length > 30 || email.value.length == 0) {
    labelEmail.setAttribute("style", "color: #ba000d;");
    labelEmail.innerHTML = "Email *Máximo 30 caracteres";
    email.setAttribute("style", "border-color: #ba000d;");
    validEmail = false;
  }
  else if (validatorEmail(email.value) !== true) {
    labelEmail.setAttribute("style", "color: #ba000d;");
    labelEmail.innerHTML = "Email *Deve ter formato user@email.com";
    email.setAttribute("style", "border-color: #ba000d;");
    validEmail = false;
  }
  else {
    labelEmail.setAttribute("style", "color:#76ff03;");
    labelEmail.innerHTML = "Email";
    email.setAttribute("style", "border-color: #76ff03;");
    validEmail = true;
  }
});

//Validação email se tem @
function validatorEmail(email) {
  let emailPattern =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailPattern.test(email);
}

//Validação Senha
senha.addEventListener("keyup", () => {
  if (senha.value.length <= 5 || senha.value.length == 0 || !senha.value.match(/[A-Z]+/) || !senha.value.match(/[1-9]+/)) {
    labelSenha.setAttribute("style", "color: #ba000d;");
    labelSenha.innerHTML = "Senha *Mínimo 6 caracteres, 1 letra Maisucula e 1 número";
    senha.setAttribute("style", "border-color: #ba000d;");
    validSenha = false;
  } else {
    labelSenha.setAttribute("style", "color:#76ff03;");
    labelSenha.innerHTML = "Senha";
    senha.setAttribute("style", "border-color: #76ff03;");
    validSenha = true;
  }
});

//Validação CPF
cpf.addEventListener("keyup", () => {
  if (cpf.value.length >= 11 || cpf.value.length == 0) {
    labelCpf.setAttribute("style", "color: #ba000d;");
    labelCpf.innerHTML = "CPF *11 números";
    cpf.setAttribute("style", "border-color: #ba000d;");
    validCpf = false;
  } else {
    labelCpf.setAttribute("style", "color:#76ff03;");
    labelCpf.innerHTML = "CPF";
    cpf.setAttribute("style", "border-color: #76ff03;");
    validCpf = true;
  }
});

// Validação Celular
celular.addEventListener("keyup", () => {
  if (celular.value.length >= 11 || celular.value.length == 0) {
    labelCelular.setAttribute("style", "color: #ba000d;");
    labelCelular.innerHTML = "Celular *Máximo 11 números (DD + nº)";
    celular.setAttribute("style", "border-color: #ba000d;");
    validTel = false;
  } else {
    labelCelular.setAttribute("style", "color:#4ae94a;");
    labelCelular.innerHTML = "Celular";
    celular.setAttribute("style", "border-color: #4ae94a;");
    validCel = true;
  }
});


function cadastrar() {
  if (validNome && validEmail && validCel && validSenha && validCpf) {

     let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]'); //pode-se add + de 1 user

     listaUser.push({
       nomeCad: nome.value,
       emailCad: email.value,
       senhaCad: senha.value,
       cpfCad: cpf.value,
       celularCad: celular.value,
     });

     localStorage.setItem('listaUser', JSON.stringify(listaUser)); //Gravando no localStorage

     msgSuccess.setAttribute('style', 'display: block');
     msgSuccess.innerHTML = '<strong>Fazendo o cadastro no Mideia...</strong>';
     msgError.setAttribute('style', 'display: none');
     msgError.innerHTML = ''; 

     setTimeout(() => {
      window.location.href = 'Views/login.html';
     }, 2000);
     
  }
  else{
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = '<strong>Preencha os dados corretamente!</strong>';
    msgSuccess.setAttribute('style', 'display: none');
    msgSuccess.innerHTML = '';
  }
}
