const axios = require('axios').default;

const API_URL = 'https://pixabay.com/api/';

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
                per_page: 18,
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

export { Img }