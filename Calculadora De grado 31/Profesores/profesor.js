document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-registro');
    const listaProfesores = document.getElementById('lista-profesores');
    let profesores = [];

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;

        if (nombre && email) {
            const nuevoProfesor = { id: Date.now(), nombre, email };
            profesores.push(nuevoProfesor);
            actualizarListaProfesores();
            formulario.reset();
        } else {
            alert('Todos los campos son obligatorios');
        }
    });

    function actualizarListaProfesores() {
        listaProfesores.innerHTML = '';
        profesores.forEach(profesor => {
            const li = document.createElement('li');
            li.textContent = `${profesor.nombre} (${profesor.email})`;
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => {
                eliminarProfesor(profesor.id);
            });
            li.appendChild(botonEliminar);
            listaProfesores.appendChild(li);
        });
    }

    function eliminarProfesor(id) {
        profesores = profesores.filter(profesor => profesor.id !== id);
        actualizarListaProfesores();
    }
});
