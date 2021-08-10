//variables del dom
const $template = document.getElementById('template-producto').content,
$contentBody = document.getElementById('content-body'),
$fragment = document.createDocumentFragment();

const getProducts = async (url) => {
   let res = await fetch(url),
    json = await res.json();  
        
        json.data.forEach(el => {
            console.log(el);
    
            $template.querySelector("img").setAttribute("src", el.url_image);
            $template.querySelector('h5').textContent = el.name;
            $template.querySelector('span').textContent = el.price
    
            let $clone = document.importNode($template, true);
            $fragment.appendChild($clone);
        });
        $contentBody.appendChild($fragment);
    

};


//Cargar todos los productos a la carga del DOM
document.addEventListener('DOMContentLoaded', () => {
    
    getProducts("http://localhost:8080/api/productos/");
});

//Delegacion de eventos on click => para agregar a carrito 
document.addEventListener('click', (e) => {
    if(e.target.matches('.boton-agregar')) {
        alert('Boton agregar')
    };
    
    if(e.target.matches('.botones-hilera button')) {
        $contentBody.innerHTML = '';
        alert(e.target.value);
        getProducts("http://localhost:8080/api/productos/");
    }
});


//Evento on submit => para la Search-bar
document.addEventListener('submit', (e) => {    
    const searchResult = document.getElementById('search-text').value;    
    e.preventDefault();
    $contentBody.innerHTML = '';
    getProducts(`http://localhost:8080/api/search/productos/${searchResult}`);

    if(searchResult === '') {
        getProducts("http://localhost:8080/api/productos/")
    }
});
