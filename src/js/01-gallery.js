import { galleryItems } from './gallery-items.js';
// Change code below this line

const modalWindowCloser = event => {
    if (event.code === "Escape") {
       modalWindow.close();         
        // I Can't remove the event listener from inside the callback function!!!
        document.removeEventListener("keydown",  modalWindowCloser);       
    }  
}

const modalWindowOpener = event => {
    event.preventDefault();
    if (event.target.tagName !== "IMG")
        return;
    const zoomPictureUrl = event.target.dataset.source;  
    modalWindow = basicLightbox.create(`
    <div class="modal">
        <img src="${zoomPictureUrl}" width="800">
    </div>`);
    modalWindow.show();   
    document.addEventListener("keydown", modalWindowCloser);  
}

let markUp = '';
let modalWindow;
for (const galleryItem of galleryItems) {
    markUp += `<div class="gallery__item">
    <a class="gallery__link" href="${galleryItem.original}">
    <img class="gallery__image"src="${galleryItem.preview}" 
    data-source="${galleryItem.original}" 
    alt="Image description"/></a>
    </div>`;    
}

const galleryContainer = document.querySelector('.gallery');
galleryContainer.innerHTML = markUp;
galleryContainer.addEventListener('click', event => modalWindowOpener(event));
    


