import { Img } from "./getImgsClass.js";
import { refs } from "./refs.js";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// refs.loadBtnRef.hidden = true;

const img = new Img({
    searchValue: '',
});

const gallery = new SimpleLightbox('.gallery a');

function serchImg (event){
    event.preventDefault();

    refs.gallery.innerHTML= '';
    img.resetPage();

    img.searchValue = event.target.searchQuery.value.trim();
    event.target.searchQuery.value = '';

    img.fetchImg().then(({ data }) => {
        if (!data.total){
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return
        }
        
        Notify.success(`Hooray! We found ${data.totalHits} images.`);

        renderUserListItems(data.hits);

        gallery.refresh();

        if (refs.gallery.children.length < data.total){
            refs.loadBtnRef.hidden = false;
        }

    });
}

function markupNext (){
    img.nextPage();

    img.fetchImg().then(({ data }) => {

        renderUserListItems(data.hits);

        gallery.refresh();

        scroll();

        if(refs.gallery.children.length === data.total){
            Notify.info("We're sorry, but you've reached the end of search results.");
            refs.loadBtnRef.hidden = true;
        }

    });

    
}

function renderUserListItems(imgs) {
    const markup = imgs
    .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<div class="photo-card">
        <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="500px"/>
            <div class="info">
                <p class="info-item">
                    <b>Likes - ${likes}</b>
                </p>
                <p class="info-item">
                    <b>Views - ${views}</b>
                </p>
                <p class="info-item">
                    <b>Comments - ${comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads - ${downloads}</b>
                </p>
            </div>
        </a>
    </div>`)
    .join('');

    refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function scroll (){
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2.1,
        behavior: "smooth",
        });
}
refs.formRef.addEventListener('submit', serchImg);
refs.loadBtnRef.addEventListener('click', markupNext);