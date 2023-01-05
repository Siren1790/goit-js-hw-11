const axios = require('axios').default;

const API_URL = 'https://pixabay.com/api/';

refs = {
    formRef: document.querySelector('#search-form'),
    loadBtnRef: document.querySelector('.js-load-more'),
    gallery: document.querySelector('.gallery'),
}

class Img {
    constructor({searchValue}){
        this.searchValue = searchValue;
        this.currentPage = 1;
    }

    async fetchImg(){
        try {
            const response = await axios.get(API_URL, {
                params: {
                key: '32586703-3cda94dac50b012465c4c9243',
                q: this.searchValue,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,                
                per_page: 20,
                page: this.currentPage,
            }
        });
            return response;            
        } catch (error) {
            console.error(error);
        }
    }

    nextPage(){
        this.currentPage += 1;
    }

    resetPage(){
        this.currentPage = 1;
    }
}

const img = new Img({
    searchValue: '',
});

function serchImg (event){
    event.preventDefault();
    img.searchValue = event.target.searchQuery.value;
    img.fetchImg().then(({ data }) => {
        console.log(data);
    });
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