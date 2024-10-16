// Lista para almacenar las tareas
let tareas = [];

// Clase para representar una tarea
class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.estado = 'Pendiente'; // Estado inicial
    }
}

// agregar una nueva tarea
function agregarTarea() {
    const nombreTarea = document.getElementById('task-name').value;
    if (nombreTarea !== "") {
        const nuevaTarea = new Tarea(nombreTarea);
        tareas.push(nuevaTarea);
        document.getElementById('task-name').value = ''; // Limpiar el campo de entrada
        renderizarTareas();
    }
}

//  mover las tareas 
function moverTarea(index) {
    const tarea = tareas[index];
    if (tarea.estado === 'Pendiente') {
        tarea.estado = 'Haciendo';
    } else if (tarea.estado === 'Haciendo') {
        tarea.estado = 'Completada';
    }
    renderizarTareas();
}

//  regresar una tarea de 'Haciendo' a 'Pendiente'
function regresarTarea(index) {
    const tarea = tareas[index];
    if (tarea.estado === 'Haciendo') {
        tarea.estado = 'Pendiente';
    }
    renderizarTareas();
}

// para eliminar tarea
function eliminarTarea(index) {
    tareas.splice(index, 1); 
    renderizarTareas(); 
}

// renderizar tareas
function renderizarTareas() {
    // Limpiar las columnas antes de renderizar
    document.getElementById('pendientes').innerHTML = '';
    document.getElementById('haciendo').innerHTML = '';
    document.getElementById('completadas').innerHTML = '';

    tareas.forEach((tarea, index) => {
        const tareaElemento = document.createElement('div');
        tareaElemento.className = 'task';
        tareaElemento.textContent = tarea.nombre;

        // botón de eliminar
        const eliminarBoton = document.createElement('button');
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.className = 'delete-btn';
        eliminarBoton.onclick = () => eliminarTarea(index);
        tareaElemento.appendChild(eliminarBoton);


        if (tarea.estado === 'Pendiente') {
            tareaElemento.onclick = () => moverTarea(index);
            document.getElementById('pendientes').appendChild(tareaElemento);
        } else if (tarea.estado === 'Haciendo') {
            const moverBoton = document.createElement('button');
            moverBoton.textContent = 'Mover a Completada';
            moverBoton.onclick = () => moverTarea(index);
            tareaElemento.appendChild(moverBoton);

            const regresarBoton = document.createElement('button');
            regresarBoton.textContent = 'Mover a Pendiente';
            regresarBoton.onclick = () => regresarTarea(index);
            tareaElemento.appendChild(regresarBoton);

            document.getElementById('haciendo').appendChild(tareaElemento);
        } else if (tarea.estado === 'Completada') {
            document.getElementById('completadas').appendChild(tareaElemento);
        }
    });
}


document.getElementById('add-task-btn').onclick = agregarTarea;
