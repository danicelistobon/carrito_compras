// Variables

const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Event listeners

eventListeners();

function eventListeners () {
  // cuando se da click en agregar carrito
  cursos.addEventListener('click', comprarCurso);
  // cuando se elimina un curso del carrito
  carrito.addEventListener('click', eliminarCurso);
  // al vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  // contenido cargado, mostrar LS
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

// Funciones

// añade el curso al carrito
function comprarCurso (event) {
  event.preventDefault();
  // delegation al boton
  if (event.target.classList.contains('agregar-carrito')) {
    const curso = event.target.parentElement.parentElement;
    // envia curso selec para tomar sus datos
    leerDatosCurso(curso);
  }
}

// lee los datos del curso
function leerDatosCurso (curso) {
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id')
  };
  insertarCarrito(infoCurso);
}

// muestra el curso selec en el carrito
function insertarCarrito (curso) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
        <img src="${curso.imagen}" width=100>
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
  `;
  listaCursos.appendChild(row);
  insertarCursoLocalStorage(curso);
}

// elimina el curso del carrito
function eliminarCurso (event) {
  event.preventDefault();
  let curso;
  // delegation al boton
  if (event.target.classList.contains('borrar-curso')) {
    event.target.parentElement.parentElement.remove();
  }
}

// elimina todos los cursos del carrito
function vaciarCarrito () {
  // forma lenta
  // listaCursos.innerHTML = '';
  // forma rapida (recomendada)
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }
  // leer articulo while vs innerHTML que compara ambos metodos
  return false;
}

// almacena los cursos en el LS
function insertarCursoLocalStorage (curso) {
  let cursos;
  cursos = obtenerCursosLocalStorage();
  // añadir el curso al final del array
  cursos.push(curso);
  // convertir de str a array para LS
  localStorage.setItem('cursos', JSON.stringify(cursos));
}

// comprobar que hayan elementos en LS, retorna un array
function obtenerCursosLocalStorage () {
  let cursosLS;
  // revisamos los valores dentro de LS
  if (localStorage.getItem('cursos') === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem('cursos'));
  }
  return cursosLS;
}

// mostrar datos de LS en el carrito
function leerLocalStorage () {
  let cursosLS;
  cursosLS = obtenerCursosLocalStorage();
  cursosLS.forEach(function (curso) {
    // construir el template
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
  });
}
