const API_KEY = '32586703-3cda94dac50b012465c4c9243';
const API_URL = 'https://pixabay.com/api/';

refs = {
    formRef: document.querySelector('#search-form'),
    loadBtnRef: document.querySelector('.js-load-more'),
    gallery: document.querySelector('.gallery'),
}

class img {
    constructor({searchValue}){
        this.searchValue = searchValue;
        this.currentPage = 1;
    }

    fetchImg(){

    }

    nextPage(){
        this.currentPage += 1;
        this.fetchImg();
    }
}


function serchImg (event){
    event.preventDefault();
    console.log(event.target.searchQuery.value);
    // *********
    event.target.searchQuery.value = '';
}

function markupNext (){
    // *********
    console.log("LOAD MORE...")
}

function renderUserListItems(users) {
    const markup = users
    .map((user) => `<li class="item">
        <p><b>Name</b>: ${user.name}</p>
        <p><b>Email</b>: ${user.email}</p>
        <p><b>Company</b>: ${user.company.name}</p>
        </li>`
    )
    .join("");
    userList.innerHTML = markup;
}


refs.formRef.addEventListener('submit', serchImg);
refs.loadBtnRef.addEventListener('click', markupNext);