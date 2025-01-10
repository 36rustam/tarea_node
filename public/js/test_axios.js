
console.log('test_axios.js dice hola');

// Ruta para ejecutar las solicitudes;
const rutaFetch='http://localhost:3000/test_axios/fetch';

// GET;

// Elementos;
const cajaResultsGet = $('#caja_results_get');
const butGetDatos = $('#get_datos');

// El evento para el botom;
butGetDatos.on('click', () => {
    fetchGet(rutaFetch)
});

// La solicitud;
function fetchGet(rutaFetch) {
    // console.log('click');
    axios.get(rutaFetch).then(result=>{
        result.statusText==='OK'
        ?cajaResultsGet.removeClass('bg-warning').addClass('bg-success').text(result.data)
        :console.error(result);
    })
};


// POST;

// Elementos;
const cajaResultsPost=$('#caja_results_post');
const butPostDatos=$('#post_datos');

// Datos; Para req.query
let signo = $('#signo').text()==='+'?'mas':'menos';

// Datos; Para req._readableState.buffer.toString()
const primero=$('#primero').text();
const segundo=$('#segundo').text();

const paramSolic={
    ruta:rutaFetch,
    signo:signo,
    primero:primero,
    segundo:segundo,
};

butPostDatos.on('click', ()=>{
    fetchPost(paramSolic)
});

function fetchPost(paramSolic){
    console.log(paramSolic);
    axios.post(
        `${paramSolic.ruta}?signo=${paramSolic.signo}`,
        {
            primero:paramSolic.primero,
            segundo:paramSolic.segundo,
        }
    ).then(result=>{
        result.statusText==='OK'
        ?cajaResultsPost.text(result.data).removeClass('bg-warning').addClass('bg-success')
        :console.error(result);
    });
};