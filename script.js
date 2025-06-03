const botones = document.querySelectorAll('.menu-categorias button[data-categoria]');
const secciones = document.querySelectorAll('.categoria');
const componentes = document.querySelectorAll('.componente');
const botonOrdenar = document.getElementById('ordenar-alfabeticamente');
let ordenAscendente = true;

function actualizarVisibilidadCategorias() {
  secciones.forEach(seccion => {
    const visibles = Array.from(seccion.querySelectorAll('.componente')).filter(
      comp => comp.style.display !== 'none'
    );
    seccion.style.display = visibles.length > 0 ? 'block' : 'none';
  });
}

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    botones.forEach(b => b.classList.remove('activo'));
    boton.classList.add('activo');

    const categoria = boton.getAttribute('data-categoria');

    if (categoria === 'internas' || categoria === 'externas') {
      secciones.forEach(seccion => {
        seccion.style.display = seccion.classList.contains(categoria) ? 'block' : 'none';
      });
      componentes.forEach(comp => comp.style.display = 'block');
    } else if (categoria === 'todos') {
      secciones.forEach(seccion => seccion.style.display = 'block');
      componentes.forEach(comp => comp.style.display = 'block');
    } else {
      secciones.forEach(seccion => seccion.style.display = 'block');
      componentes.forEach(comp => {
        comp.style.display = comp.classList.contains(categoria) ? 'block' : 'none';
      });
    }

    actualizarVisibilidadCategorias();
  });
});

botonOrdenar.addEventListener('click', () => {
  secciones.forEach(seccion => {
    const contenedor = seccion.querySelector('.categoria-grid');
    if (contenedor) {
      const tarjetas = Array.from(contenedor.querySelectorAll('.componente')).filter(
        tarjeta => tarjeta.style.display !== 'none'
      );

      tarjetas.sort((a, b) => {
        const nombreA = a.querySelector('h3').textContent.toLowerCase();
        const nombreB = b.querySelector('h3').textContent.toLowerCase();
        return ordenAscendente
          ? nombreA.localeCompare(nombreB)
          : nombreB.localeCompare(nombreA);
      });

      tarjetas.forEach(tarjeta => contenedor.appendChild(tarjeta));
    }
  });

  ordenAscendente = !ordenAscendente;

  botonOrdenar.textContent = ordenAscendente ? 'Ordenar A-Z' : 'Ordenar Z-A';
});

const btnTop = document.getElementById('btn-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnTop.classList.add('show');
  } else {
    btnTop.classList.remove('show');
  }
});

btnTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
