var usuarios = [];
var categorias = [];
var usuarioSeleccionado;
var ordenes = [];

var requestOptions = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json"
    }
};

//Obtener todos los usuarios
fetch("http://localhost:5000/usuarios", requestOptions)
    .then(response => response.json())
    .then(result => {
        usuarios = result;
        console.log(usuarios);
        listaUsuarios();
    }).catch(error => console.log('error', error));

mostrarCategorias();

function mostrarCategorias(){
    //Obtener todas las categorias
    fetch("http://localhost:5000/categorias", requestOptions)
        .then(response => response.json())
        .then(result => {
            categorias = result;
            console.log(categorias);
            pintandoCategoriasLugo();
        }).catch(error => console.log('error', error));
}

// Generando listas de categorias para pintarlas en pantalla ya estilizadas
function pintandoCategoriasLugo () {
    //console.log('Works');
    document.getElementById('contenedor-categorias').innerHTML = ``;

    categorias.forEach(categoria => {
        obtenerCategoria(categoria._id);
    });
}

function obtenerCategoria(_id){
    //Obtener una categoria
    fetch(`http://localhost:5000/categorias/${_id}`, requestOptions) 
    .then(response => response.json())
    .then(result => {
        imprimirCategoria(result);
    }).catch(error => console.log('error', error));
}

function imprimirCategoria(categoria){
    let nombreCategoria = categoria.nombreCategoria;
    document.getElementById('contenedor-categorias').innerHTML += `
    <div class="col-lg-3 col-md-4 col-sm-6 mt-2" onclick= "obtenerCategoria2('${categoria._id}')">
        <div class="card-item card" style="background: ${categoria.color};" >
            <div class="row">
                <div class="col mx-auto text-center m-3">
                    <i class="${categoria.icono} cat-icon"></i>
                </div>
                <div class="col">

                </div>
            </div>
            <div class="row m-3 mt-4">
                <section class="col">
                    <h3 class="text-white font-weight-bolder">${categoria.nombreCategoria}</h3>
                    <p class="text-white" style="font-size: 13px;">
                        ${categoria.empresas.length} Comercios
                    </p>
                </section>
            </div>
        </div>
    </div>
    `;
}

// Generando Usuarios 
function listaUsuarios() { 
    document.getElementById('usuarioActual').innerHTML = '';
    document.getElementById('usuarioActual').innerHTML =  `<option value="${ null }"></option>`;
    for (let i=0;i<usuarios.length;i++) {
        document.getElementById('usuarioActual').innerHTML += 
        `<option value="${ i }">${ usuarios[i].nombre } ${ usuarios[i].apellido }</option>`;
    }
}

// Onchange para seleccionar un usuario
function cambiarUsuario () {
    let id = (document.querySelector('#usuarioActual').value);
    console.log(id);
    //Obtener un usuario
    fetch(`http://localhost:5000/usuarios/${Number(id)+1}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        usuarioSeleccionado = result;
        console.log(usuarioSeleccionado);
        cambiarMensaje();
    }).catch(error => console.log(error));
}

function cambiarMensaje(){
    document.getElementById('texto-hola').innerHTML = `¡Hola ${usuarioSeleccionado.nombre}!`;
}

function obtenerOrdenes(){  
    if(usuarioSeleccionado == null){
        alert('Selecione un usuario.');
        return;
    }

    //Obtener las ordenes del usuario seleccionado.
    fetch(`http://localhost:5000/usuarios/${usuarioSeleccionado.idUsuario}/ordenes`, requestOptions)
    .then(response => response.json())
    .then(result => {
        ordenes = result;
        console.log(ordenes);
        verOrdenes();
    }).catch(error => console.log(error));
}
// Ver Ordenes de un usuario con el boton de ver ordenes
function verOrdenes() {;
    console.log(usuarioSeleccionado);
    // Header Modal
    document.querySelector('#modalUserLabel').innerHTML = `${usuarioSeleccionado.nombre} , Estas Son Tus Ordenes.`;
    // Zona de Productos
    console.log(ordenes.length);
    document.querySelector('#zona-productos').innerHTML = '';
    for(let i=0;i<ordenes.length;i++) {
        document.querySelector('#zona-productos').innerHTML += `
            <p>
                <h3 style="color: #563D7C; font-weight: bold;">${ordenes[i].nombreProducto }</h3>
            </p>
            <p style="font-size: 18px;">
                ${ordenes[i].descripcion}
            </p>
            <p class="ml-auto">
                <b style="font-size: 25px">$${ordenes[i].precio}</b>
            </p>
            <hr>
        `;
    }
}

function obtenerCategoria2(_id){
    //Obtener una categoria
    fetch(`http://localhost:5000/categorias/${_id}`, requestOptions) 
    .then(response => response.json())
    .then(result => {
        obtenerEmpresas(result);
        console.log(result);
    }).catch(error => console.log('error', error));
}


function obtenerEmpresas(categoria){
    //Obtener las empresas
    fetch(`http://localhost:5000/categorias/${categoria._id}/empresas`, requestOptions) 
    .then(response => response.json())
    .then(result => {
        imprimirInfoCategoria(result, categoria);
    }).catch(error => console.log('error', error));
};

// Ver info sobre categorias
function imprimirInfoCategoria(empresas, categoria) {

    document.getElementById('zona-categorias').innerHTML = "";
    $('#modalCategorias').modal('show');

    document.getElementById('header-categorias').innerHTML = `${ categoria.nombreCategoria }`;

    for(let i=0; i < empresas.length;i++) {
            const productosPintar = empresas[i];
            let productos = '';
            for(let j=0; j<productosPintar.productos.length; j++) {
                productos += `
                    <div class="row p-2">
                        <div class="col-lg-7">
                            <h4 style="color:#563D7C;">${ productosPintar.productos[j].nombreProducto }</h4>
                        </div>
                        <div class="col-lg-5">
                            <input type="button" class="btn btn-secondary" onclick="obtenerProducto('${ categoria._id }' , ${ i } ,${ j })" value="Pedir">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8">
                            <p>${ productosPintar.productos[j].descripcion }</p>
                        </div>
                        <div class="col-lg-4 ml-auto">
                            <b>$ ${ productosPintar.productos[j].precio }</b>
                        </div>
                    </div>
                    
                `;
            }
            document.getElementById('zona-categorias').innerHTML += `
                <div class="col-lg-6 col-sm-12 mt-2">
                    <div class="card" style="border-radius:12px">
                        <section>
                            <img src="img/banner.jpg" class="img-fluid" style="border-radius: 12px"/>
                            <h3 style="color: #fff; font-weight:bolder;">${ empresas[i].nombreEmpresa }</h3>
                        </section>
                        <section class="p-3">
                            ${ productos }
                        </section>
                    </div>
                </div>
            `;
        }
};

function obtenerProducto(_idCategoria, indiceEmpresa, indiceProducto){
     //Obtener un producto
     fetch(`http://localhost:5000/categorias/${_idCategoria}/empresas/${indiceEmpresa}/productos/${indiceProducto}`, requestOptions) 
     .then(response => response.json())
     .then(result => {
         pedir(result);
     }).catch(error => console.log('error', error));
}

// Funcion para pedir orden a los usuarios
function pedir (producto) {
    $('#modalPedidos').modal('show');

    document.getElementById('zona-pedidos').innerHTML =`
        <h3>${producto.nombreProducto }</h3><br>
        <p>${ producto.descripcion }</p><br>
        <div class="row">
            <div class="col-lg-4">
                Cantidad A Solicitar : 
            </div>
            <div class="col-lg-8">
                <input type="text" class="form-control" id="txt-cantidad" />    
            </div>
        </div>
        <div class="row">
            <div class="col-lg-10 mr-auto">
                
            </div>
            <div class="col-lg-2"><br>
            <b>$ ${ producto.precio }</b>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" onclick="agregarPedido('${producto.nombreProducto}','${producto.descripcion}',${producto.precio})" 
            class="btn btn-secondary">
            Procesar Orden</button>
        </div>
    `;
}

// Funcion para agregar un producto nuevo a un usuario 
function agregarPedido(nombre, descripcion, precio) {

    if(usuarioSeleccionado == null ){
        alert('Seleccione un usuario.');
        return;
    }

    let cantidad = document.getElementById('txt-cantidad').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("nombreProducto", nombre);
    urlencoded.append("descripcion", descripcion);
    urlencoded.append("cantidad", cantidad);
    urlencoded.append("precio", precio);

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch(`http://localhost:5000/usuarios/${usuarioSeleccionado.idUsuario}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    $('#modalPedidos').modal('hide');
    $('#modalCategorias').modal('hide');
}

// creando una nueva categoria
function crearCategoria() {
    $('#modalPedidos').modal('hide');
    $('#modalCategorias').modal('hide');
    $('#modalCreacionCategoria').modal('show');
}

function guardar() {
    let txtnombre = document.getElementById('txt-nombre').value;
    let txtdescripcion = document.getElementById('txt-descripcion').value;
    let txtcolor = document.getElementById('txt-color').value;
    let txticono = document.getElementById('txt-icono').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("nombreCategoria", txtnombre);
    urlencoded.append("descripcion", txtdescripcion);
    urlencoded.append("color", txtcolor);
    urlencoded.append("icono", txticono);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch("http://localhost:5000/categorias", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    $('#modalPedidos').modal('hide');
    $('#modalCategorias').modal('hide');
    $('#modalCreacionCategoria').modal('hide');
    mostrarCategorias();
}