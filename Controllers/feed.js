let userLogado = JSON.parse(localStorage.getItem('userLogado'));

let logado = document.querySelector('.logado');
let nameUser = document.querySelector('.nameUser');

logado.innerHTML = userLogado.nome;

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

// let imagem = document.getElementById('imagem');
// let imagemInput = document.querySelector('#action1');

// imagem.addEventListener('click', () => {
//     imagemInput.click();
// });


class makePost {
    constructor(idForm, idTextArea, idUlPost) {
        this.form = document.getElementById(idForm);
        this.textarea = document.getElementById(idTextArea);
        this.ulPost = document.getElementById(idUlPost);
        this.addSubmit();
    }

    onSubmit(func) {
        this.form.addEventListener('submit', func);
    }

    formValidate(value) {
        if (value == '' || value == null || value == undefined) {
            return false
        }

        return true;
    }

    getTime(){
        const time = new Date();
        const hour = time.getHours();
        const minutes = time.getMinutes();
        const dia = time.getUTCDate();
        const mes = time.getMonth() + 1;
        const ano = time.getFullYear();

        return `${dia}/${mes}/${ano} | ${hour}h ${minutes}min`;
    }


    addSubmit() {       

        const handleSubmit = (event) => {
            event.preventDefault();
            if (this.formValidate(this.textarea.value)) {
                const time = this.getTime();
                const newPost = document.createElement('li');
                newPost.classList.add('post');
                newPost.innerHTML = `
                    <div class="info-user-post">
                        <div class="user">
                            <img src="../assets/user.png" alt="Icone User">
                            <h3 class="logado">${userLogado.nome}</h3>
                        </div>

                        <div class="hour">
                            <span id="timePost">${time}</span>
                        </div>

                        <p>
                            ${this.textarea.value} 
                        </p>

                        <div class="action-post">
                            <button type="button" class="btn-action-post action-post1"><img src="../assets/heart.svg" alt="Curtir"></button>
                            <button type="button" class="btn-action-post action-post2"><img src="../assets/comentario.svg" alt="Comentar"></button>                        
                            <button type="button" class="btn-action-post action-post3"><img src="../assets/share.svg" alt="Compartilhar"></button>                        
                        </div>
                    </div>
                `;

                this.ulPost.append(newPost);
                this.textarea.value = ""; //Para vir vazio o próximo  post

                msgError.setAttribute('style', 'display: none');
                msgError.innerHTML = '';

            }else{
                msgError.setAttribute('style', 'display: block');
                msgError.innerHTML = '<strong>Verifique seu post, ele parece estar vazio!</strong>';
            }
        }

        this.onSubmit(handleSubmit);
    }

}

const makeForm = new makePost('formPost', 'textarea', 'posts');