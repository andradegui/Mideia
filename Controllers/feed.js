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
    constructor(idForm, idTextArea, idUlPost, idPostImage, idPostVideo) {
        this.form = document.getElementById(idForm);
        this.textarea = document.getElementById(idTextArea);
        this.ulPost = document.getElementById(idUlPost);
        this.postImage = document.getElementById(idPostImage);
        this.postVideo = document.getElementById(idPostVideo);

        this.posts = [];
        this.addSubmit();

        document.getElementById('posts').innerHTML = localStorage.getItem('posts');
    }

    onSubmit(func) {
        this.form.addEventListener('submit', func);
    }

    formValidate(value) {
        //valida os valores do campo texto para publicação
        if (value === '' || value === null || value === undefined) {
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

                        <p style="margin-top: 10px; justify-content: center; align-items: center; display:flex;">
                            ${this.textarea.value} 
                        </p>`

                if (this.postImage.mostrar)
                    newPost.innerHTML += `<img src="${this.postImage.src}"style="width:200px; margin-bottom: 200px; border-radius: 10px; outline: none; border: none;">`;

                if (this.postVideo.mostrar)
                    newPost.innerHTML += `<video src="${this.postVideo.src}"controls style="width:300px; margin-bottom: 300px; border-radius: 10px;"></video>`;


                this.ulPost.append(newPost);

                this.textarea.value = ""; //Para vir vazio o próximo  post

                this.postImage.src = null;
                this.postImage.mostrar = false;
                this.postImage.value = "";

                this.postVideo.src = null;
                this.postVideo.mostrar = false;


                this.posts = [...this.posts, '<li class="postUser">' + newPost.innerHTML + '</li>'];
                localStorage.setItem('posts', this.posts)

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

const makeForm = new makePost('formPost', 'textarea', 'posts', 'previewImagem', 'videoCarregado');

let photo = document.getElementById('imgIcon');
let file = document.getElementById('inputImagem');

photo.addEventListener('click', () => {
    file.click();
});

//Upload da Imagem
const inputImagem = document.querySelector("#inputImagem");
inputImagem.mostrar = false;

let postMultimidea = document.querySelector("#postMultimidea"); 
let previewImagem = document.querySelector("#previewImagem");

inputImagem.addEventListener("change", function () {
    const reader = new FileReader();

    previewImagem.style.display = 'block';

    reader.addEventListener("load", () => {        
        let imagemCarregada = reader.result;
        previewImagem.mostrar = true;
        previewImagem.src = imagemCarregada;        
    });
    reader.readAsDataURL(this.files[0]);  
      
});


let video = document.getElementById('video');
let inputVideo = document.getElementById('inputVideo');

 video.addEventListener('click', () => {
     inputVideo.click();
});

inputVideo.mostrar = false;

let videoCarregado = document.querySelector("#videoCarregado");

inputVideo.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const uploadedVideo = reader.result;
        videoCarregado.mostrar = true;
        videoCarregado.src = uploadedVideo;
    });
    reader.readAsDataURL(this.files[0]);
});



// const flAudio = document.querySelector("#flAudio");




