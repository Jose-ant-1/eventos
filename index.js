console.log('Happy developing ✨')
let personas = [
    {
        name: 'Jon',
        surname: 'Doe',
        age: 12,
        alive: true,
        editCount: 0
    },
    {
        name: 'Jane',
        surname: 'Done',
        age: 3,
        alive: true,
        editCount: 0
    },
    {
        name: 'Foo',
        surname: 'Bar',
        age: 33,
        alive: true,
        editCount: 0
    }
];

const papelera = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>`
const check = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
</svg>`;
const equis = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>`;

function mostrarDatosTabla(listaAMostrar) {
    return listaAMostrar
        .map((persona, index) => {
            return `<tr data-index="${index}" data-editcount="${persona.editCount}">
                <td>${persona.name}</td>
                <td>${persona.surname}</td>
                <td>${persona.age}</td>
                <td>${persona.alive ? check : equis}</td>
                <td>${papelera}</td>
            </tr>`;
        })
        .join('');
}

document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("tbody");
    const boton = document.getElementById("boton");

    const inputNombre = document.getElementById("nombre");
    const inputApellido = document.getElementById("apellido");
    const inputEdad = document.getElementById("edad");
    const inputVivo = document.getElementById("vivo");

    // Pintamos la tabla al inicio
    tbody.innerHTML = mostrarDatosTabla(personas);

    let filaSeleccionada = null;

    // Delegación de eventos en <tbody>
    tbody.addEventListener("click", (e) => {

        const fila = e.target.closest("tr"); // Obtiene la fila pulsada
        if (!fila) return;

        tbody.querySelectorAll("td.bg-success").forEach(td => {
            td.classList.remove("bg-success");
        })

        const celda = e.target.closest("td");
        if (celda) {
            celda.classList.add("bg-success");
        }


        // Quitar resaltado previo
        if (filaSeleccionada) {
            filaSeleccionada.classList.remove("table-success");
        }

        // Resaltar fila nueva
        fila.classList.add("table-success");
        filaSeleccionada = fila;

        // Obtener el índice
        const index = fila.dataset.index;
        const persona = personas[index];

        // Cargar datos en formulario
        inputNombre.value = persona.name;
        inputApellido.value = persona.surname;
        inputEdad.value = persona.age;
        inputVivo.checked = persona.alive;

        // Cambiar texto del botón
        boton.textContent = "Edit";

        // Guardar el índice en el botón para saber qué persona editar
        boton.dataset.editing = index;

    });

    boton.addEventListener("click", (e) => {
        e.preventDefault();
        const index = boton.dataset.editing;
        const persona = personas[index];
        if (boton.textContent === "Edit" && boton.dataset.editing !== undefined) {
            if (inputNombre.value !== "" && inputApellido.value !== "" && inputEdad.value >= 0) {
                persona.name = inputNombre.value;
                persona.surname = inputApellido.value;
                persona.age = Number(inputEdad.value);
                persona.alive = inputVivo.checked;
                persona.editCount++;
            }

        } else {
            if (inputNombre.value !== "" && inputApellido.value !== "" && inputEdad.value >= 0) {
                const personaNueva = {
                    name: inputNombre.value,
                    surname: inputApellido.value,
                    age: Number(inputEdad.value),
                    alive: inputVivo.checked,
                    editCount: 0,
                }
                personas.push(personaNueva);
            }
        }


        tbody.innerHTML = mostrarDatosTabla(personas);

        inputNombre.value = "";
        inputApellido.value = "";
        inputEdad.value = "";

        boton.textContent = "Nuevo";
        delete boton.dataset.editing;
        filaSeleccionada = null;
    })

});
