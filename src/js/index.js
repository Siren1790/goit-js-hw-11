import { Img } from "./getImgsClass";
import { refs } from "./refs";

refs.loadBtnRef.hidden = true;

const img = new Img({
    searchValue: '',
});

function serchImg (event){
    event.preventDefault();

    refs.gallery.innerHTML= '';
    img.resetPage();

    img.searchValue = event.target.searchQuery.value.trim();
    event.target.searchQuery.value = '';

    img.fetchImg().then(({ data }) => {
        if (!data.total){
            return console.log('OPS No Img');
        }
        
        renderUserListItems(data.hits);

        if (refs.gallery.children.length < data.total){
            refs.loadBtnRef.hidden = false;
        }

    });
}

function markupNext (){
    img.nextPage();
    img.fetchImg().then(({ data }) => {
        renderUserListItems(data.hits);
        if(refs.gallery.children.length === data.total){
            refs.loadBtnRef.hidden = true;
        }
    });

    
}

function renderUserListItems(imgs) {
    const markup = imgs
    .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="500px"/>
        <div class="info">
            <p class="info-item">
                <b>Likes ${likes}</b>
            </p>
            <p class="info-item">
                <b>Views ${views}</b>
            </p>
            <p class="info-item">
                <b>Comments ${comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads ${downloads}</b>
            </p>
        </div>
    </div>`)
    .join('');

    refs.gallery.insertAdjacentHTML('beforeend', markup);
}

refs.formRef.addEventListener('submit', serchImg);
refs.loadBtnRef.addEventListener('click', markupNext);