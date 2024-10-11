const menuToggler = document.querySelector('button')
const gallery = document.querySelector('.gallery');
function toggleMenu () {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('hide');
}

function handleResize () {
    const menu = document.querySelector('.menu');
    if (window.innerWidth > 1000){
        menu.classList.remove('hide');
    }   else {
        menu.classList.add('hide');
    }
}

function viewerTemplate (pic, alt) {
    return ` 
    <div class="viewer">
        <button class="close-viewer">X</button>
        <img src="image.jpeg" alt="alt description">
    </div>`;
}

function viewHandler(event) {
    const clickedElement = event.target;

    // Make sure the clicked element is an image before proceeding
    if (clickedElement.tagName !== 'IMG') return;

    // get the src attribute from that element and 'split' it on the "-"
    const imgSrc = clickedElement.getAttribute('src');
    const imgName = imgSrc.split('-')[0]; // Get the part before the dash

    // construct the new image file name by adding "-full.jpeg" to the first part of the array from the previous step
    const fullSizeImg = `${imgName}-full.jpeg`;

    // insert the viewerTemplate into the top of the body element
    const viewerHtml = viewerTemplate();
    document.body.insertAdjacentHTML("afterbegin", viewerHtml);

    // update the image src and alt attributes in the newly inserted viewer
    const viewerImg = document.querySelector('.viewer img');
    viewerImg.src = fullSizeImg;
    viewerImg.alt = "full size norris picture";

    // add a listener to the close button (X) that calls a function called closeViewer when clicked
    const closeButton = document.querySelector('.close-viewer');
    closeButton.addEventListener('click', closeViewer);
}

function closeViewer() {
    const viewer = document.querySelector('.viewer');
    if (viewer) {
        viewer.remove(); // Removes the .viewer div from the DOM
    }
}


handleResize();
menuToggler.addEventListener('click', toggleMenu);
window.addEventListener('resize', handleResize);
gallery.addEventListener('click', viewHandler);