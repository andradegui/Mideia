let userLogado = JSON.parse(localStorage.getItem('userLogado'));

let logado = document.querySelector('.logado');
let nameUser = document.querySelector('.nameUser');

logado.innerHTML = userLogado.nome;

//Serve para ter o controle de acesso ao feed
if (localStorage.getItem('token') == null || localStorage.getItem('token') == '' || localStorage.getItem('userLogado') == null) {
    alert('Você precisa estar logado para acessar essa página');
    window.location.href = '../Views/login.html';
}

//Excluir token de controle de acesso
function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('userLogado');
    window.location.href = '../Views/login.html';
}


class makePost {
    constructor(idForm, idTextArea, idUlPost, idPostImage) {
        this.form = document.getElementById(idForm);
        this.textarea = document.getElementById(idTextArea);
        this.ulPost = document.getElementById(idUlPost);
        this.postImage = document.getElementById(idPostImage);
        this.addSubmit();
    }

    onSubmit(func) {
        this.form.addEventListener('submit', func);
    }

    formValidate(value) {
        //valida os valores do campo texto para publicação
        if (value === '' || value === null || value === undefined || value.length < 3) {
            return false
        }
        return true
    }

    getTime() {
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
                newPost.classList.add('postUser');
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
                        </p>`

                if (this.postImage.mostrar)
                    newPost.innerHTML += `<img src="${this.postImage.src}" style="width:200px; margin-bottom: 200px;">`;


                    `<div class="action-post">
                            <button type="button" class="btn-action-post action-post1"><img src="../assets/heart.svg" alt="Curtir"></button>
                            <button type="button" class="btn-action-post action-post2"><img src="../assets/comentario.svg" alt="Comentar"></button>                        
                            <button type="button" class="btn-action-post action-post3"><img src="../assets/share.svg" alt="Compartilhar"></button>                        
                        </div>
                    </div>`;


                this.ulPost.append(newPost);
                this.textarea.value = ""; //Para vir vazio o próximo  post
                this.postImage.src = null;                
                this.postImage.mostrar = false;

                msgError.setAttribute('style', 'display: none');
                msgError.innerHTML = '';


            } else {
                msgError.setAttribute('style', 'display: block');
                msgError.innerHTML = '<strong>Verifique seu post, ele parece estar vazio!</strong>';
            }
        }

        this.onSubmit(handleSubmit);
    }

}

const makeForm = new makePost('formPost', 'textarea', 'posts', 'uploadImage');



const flImage = document.querySelector("#flImage");
const flVideo = document.querySelector("#flVideo");
const flAudio = document.querySelector("#flAudio");
flImage.mostrar = false;


let photo = document.getElementById('imgPhoto');
let file = document.getElementById('flImage');

photo.addEventListener('click', () => {
    file.click();
});

//função upload da imagem
flImage.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        document.querySelector("#uploadImage").mostrar = true;
        document.querySelector("#uploadImage").src = uploaded_image;
    });
    reader.readAsDataURL(this.files[0]);
});