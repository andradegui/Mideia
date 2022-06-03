export class makePost{
    constructor(idForm, idTextArea, idUlPost){
        this.form = document.getElementById(idForm);
        this.form = document.getElementById(idTextArea);
        this.form = document.getElementById(idUlPost);
    }

    
}

const makeForm = new makePost('formPost', 'textarea', 'posts');