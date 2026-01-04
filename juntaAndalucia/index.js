import {provincinas} from "./provincias.js";

const institutos = [
    { nombre: "IES Belen", ensenyanza: ["ESO", "Bachillerato", "FPB", "GM", "GS"] },
    { nombre: "IES Gerald Brenan", ensenyanza: ["ESO", "Bachillerato", "GM", "GS"] },
    { nombre: "Jesus Marín", ensenyanza: ["GM", "GS"] },
    { nombre: "IES Portada Alta", ensenyanza: ["ESO", "Bachillerato"] },
    { nombre: "IES CualquierOtro", ensenyanza: ["ESO", "GM"] }
];

const andalucia = provincinas.find(comunidad => comunidad.label === "Andalucía");
let provinciaSeleccionada = "";
let centroSeleccionado = "";
let ensenyanzaSeleccionada = "";

// --- TUS FUNCIONES ORIGINALES (MANTENIDAS) ---

function generarOptionProvincia(listaAGenerarOption) {
    return listaAGenerarOption.map(provincia => `<option value="${provincia.label}">${provincia.label}</option>`).join("");
}

function generarOptionCentro(centrosAGenerarOption) {
    return centrosAGenerarOption.map(centro => `<option value="${centro.nombre}">${centro.nombre}</option>`).join("");
}

function generarOptionCurso(opcionesCurso) {
    return opcionesCurso.map(opcion => `<option value="${opcion}">${opcion}</option>`).join("");
}

// --- NUEVAS FUNCIONES PARA PERSONAS (REQUISITO SOLICITADO) ---

function generarPersonaAutorizada(indice) {
    return `
    <div class="persona-autorizada" style="border: 1px solid #ddd; padding: 15px; margin: 15px 0; background: #f9f9f9;">
        <h4 class="titulo-persona">Persona Autorizada nº ${indice}</h4>
        <input type="text" name="nombre_auth[]" placeholder="Nombre" required>
        <input type="text" name="ape1_auth[]" placeholder="Primer Apellido" required>
        <input type="text" name="ape2_auth[]" placeholder="Segundo Apellido">
        <select name="tipo_doc_auth[]">
            <option value="NIF">NIF</option>
            <option value="NIE">NIE</option>
            <option value="Pasaporte">Pasaporte</option>
        </select>
        <input type="text" name="doc_auth[]" placeholder="Número Documento" required>
        <input type="tel" name="tlf_auth[]" placeholder="Teléfono" required>
        <div style="margin-top: 10px;">
            <button type="button" class="btn-mas">+</button>
            <button type="button" class="btn-menos">-</button>
        </div>
    </div>`;
}

function actualizarNumeracion() {
    const personas = document.querySelectorAll(".persona-autorizada");
    personas.forEach((div, index) => {
        div.querySelector(".titulo-persona").innerText = `Persona Autorizada nº ${index + 1}`;
        const btnMenos = div.querySelector(".btn-menos");
        if (btnMenos) btnMenos.style.display = (personas.length === 1) ? "none" : "inline-block";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const selectProvincia = document.querySelector("#provincia");
    const selectMunicipio = document.querySelector("#municipio");
    const selectInstituto = document.querySelector("#centro");
    const selectEnsenyanza = document.querySelector("#ensenyanza");
    const selectCurso = document.querySelector("#curso");
    // Referencia al nuevo contenedor
    const contenedorAutorizados = document.querySelector("#contenedor-autorizados");

    selectProvincia.innerHTML += generarOptionProvincia(andalucia.provinces);
    selectInstituto.innerHTML += generarOptionCentro(institutos);

    // --- TU LÓGICA DE PROVINCIAS/MUNICIPIOS (INTACTA) ---

    function manejarCambioProvincia(event) {
        provinciaSeleccionada = event.target.value;
        selectMunicipio.innerHTML = '<option value="">Selecciona un municipio</option>';
        if (provinciaSeleccionada) {
            const provinciaObjeto = andalucia.provinces.find(p => p.label === provinciaSeleccionada);
            if (provinciaObjeto && provinciaObjeto.towns) {
                selectMunicipio.innerHTML += provinciaObjeto.towns.
                map(town => `<option value="${town.label}">${town.label}</option>`).
                join('');
            }
        }
    }

    function manejarCambioEnsenyanza(event) {
        centroSeleccionado = event.target.value;
        selectEnsenyanza.innerHTML = '<option value="">Selecciona una enseñanza</option>';
        selectCurso.innerHTML = '<option value="">Seleccione un curso</option>';
        if (centroSeleccionado) {
            const centroObject = institutos.find(c => c.nombre === centroSeleccionado);
            if (centroObject && centroObject.ensenyanza) {
                selectEnsenyanza.innerHTML += centroObject.ensenyanza.map(ensenyanza => `<option value="${ensenyanza}">${ensenyanza}</option>`).join('');
            }
        }
    }

    function manejarCambioCurso(event) {
        ensenyanzaSeleccionada = event.target.value;
        selectCurso.innerHTML = '<option value="">Seleccione un curso</option>';
        let cursosDisponibles = [];
        if (ensenyanzaSeleccionada === "ESO") {
            cursosDisponibles = ["1º", "2º", "3º", "4º"];
        } else if (["FPB", "GM", "GS", "Bachillerato"].includes(ensenyanzaSeleccionada)) {
            cursosDisponibles = ["1º", "2º"];
        }

        if (cursosDisponibles.length > 0) {
            selectCurso.innerHTML += generarOptionCurso(cursosDisponibles);
        }
    }

    // --- LÓGICA DE DISPARO DEL FORMULARIO ---

    function agregarPersona() {
        const total = document.querySelectorAll(".persona-autorizada").length;
        contenedorAutorizados.insertAdjacentHTML('beforeend', generarPersonaAutorizada(total + 1));
        actualizarNumeracion();
    }

    // Cuando el usuario elige un curso, se añade la primera persona
    selectCurso.addEventListener('change', (e) => {
        if (e.target.value !== "" && document.querySelectorAll(".persona-autorizada").length === 0) {
            agregarPersona();
        } else if (e.target.value === "") {
            contenedorAutorizados.innerHTML = "";
        }
    });

    // Delegación de eventos para los botones + y -
    contenedorAutorizados.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-mas')) {
            agregarPersona();
        }
        if (e.target.classList.contains('btn-menos')) {
            e.target.closest('.persona-autorizada').remove();
            actualizarNumeracion();
        }
    });

    selectProvincia.addEventListener('change', manejarCambioProvincia);
    selectInstituto.addEventListener('change', manejarCambioEnsenyanza);
    selectEnsenyanza.addEventListener('change', manejarCambioCurso);
});