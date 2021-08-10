//variables del dom
const $template = document.getElementById('template-producto').content,
$contentBody = document.getElementById('content-body'),
$fragment = document.createDocumentFragment();

const getProducts = async (url) => {
   let res = await fetch(url),
    json = await res.json();
    console.log(json);

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

/* <div class="col" >
          <div class="card h-100 border border-warning">
            <img src="" class="card-img-top" alt="...">
            <div class="card-body mx-auto">
              <h5 class="card-title text-center fs-6"></h5>
              <p class="card-text text-center">Price: <span class="fw-bold text-danger"></span></p>
              <div class="d-grid gap-2">                
                  <button class="btn btn-success mx-auto">Agregar Producto</button>
            </div>
            </div>
          </div>
        </div> */



/* category: 3
discount: 15
id: 33
name: "RON PAMPERO ANIVERSARIO"
populateCategory: {id: 3, name: "ron"}
price: 20000
url_image: "https://dojiw2m9tvv09.cloudfront.net/11132/product/ron_pampero_aniversario031 */


getProducts("http://localhost:8080/api/productos/");