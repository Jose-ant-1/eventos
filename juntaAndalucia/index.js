import {provincinas} from "./provincias.js";

const institutos = [
    {
    nombre: "IES Belen", ensenyanza: ["ESO", "Bachillerato", "FPB", "GM", "GS"]
}, {
    nombre: "IES Gerald Brenan", ensenyanza: ["ESO", "Bachillerato", "GM", "GS"]
},
    {
    nombre: "Jesus Marín", ensenyanza: ["GM", "GS"]
},
    {
    nombre: "IES Portada Alta", ensenyanza: ["ESO", "Bachillerato"]
},
    {
    nombre: "IES CualquierOtro", ensenyanza: ["ESO", "GM"]
}]
const andalucia = provincinas.find(comunidad => comunidad.label === "Andalucía");
let provinciaSeleccionada = "";
let centroSeleccionado = "";
let ensenyanzaSeleccionada = "";

function generarOptionProvincia(listaAGenerarOption) {
    return listaAGenerarOption.map(provincia => `<option value="${provincia.label}">${provincia.label}</option>`).join("");
}

function generarOptionCentro(centrosAGenerarOption) {
    return centrosAGenerarOption.map(centro => `<option value="${centro.nombre}">${centro.nombre}</option>`).join("");
}

function generarOptionCurso(opcionesCurso) {
    return opcionesCurso.map(opcion => `<option value="${opcion}">${opcion}</option>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    const selectProvincia = document.getElementById("provincia");
    const selectMunicipio = document.getElementById("municipio");
    const selectInstituto = document.getElementById("centro");
    const selectEnsenyanza = document.getElementById("ensenyanza");
    const selectCurso = document.getElementById("curso");
    selectProvincia.innerHTML += generarOptionProvincia(andalucia.provinces);
    selectInstituto.innerHTML += generarOptionCentro(institutos);


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
        } else if (ensenyanzaSeleccionada === "FPB" ||
            ensenyanzaSeleccionada === "GM" ||
            ensenyanzaSeleccionada === "GS" ||
            ensenyanzaSeleccionada === "Bachillerato") {
            cursosDisponibles = ["1º", "2º"];
        }

        if (cursosDisponibles.length > 0) {
            const opcionesCurso = cursosDisponibles.map(c =>`${c}`);
            console.log(generarOptionCurso(opcionesCurso))
            selectCurso.innerHTML += generarOptionCurso(opcionesCurso);
        }

    }

    selectProvincia.addEventListener('change', manejarCambioProvincia);
    selectInstituto.addEventListener('change', manejarCambioEnsenyanza)
    selectEnsenyanza.addEventListener('change', manejarCambioCurso)
});
