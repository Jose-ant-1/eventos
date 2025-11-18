
// Variable para guardar el elemento actualmente resaltado
let elementoAnterior = null;

document.addEventListener("mousemove", function(event) {
    const elemento = event.target;

    // Cambiar resaltado al pasar por diferentes elementos
    if (elemento !== elementoAnterior) {
        if (elementoAnterior) {
            elementoAnterior.classList.remove("resaltado");
        }
        elemento.classList.add("resaltado");
        elementoAnterior = elemento;
    }

    // Obtener información que se mostrará
    const id = elemento.id ? elemento.id : "Sin id";
    const etiqueta = elemento.tagName;
    const texto = elemento.textContent.trim() || "(Sin texto)";

    // Actualizar datos visibles en la página
    document.getElementById("info").innerHTML = `
        <strong>Coordenadas del ratón:</strong><br>
        X: ${event.clientX} <br>
        Y: ${event.clientY} <br><br>

        <strong>Elemento destino:</strong><br>
        ID: ${id} <br>
        Etiqueta: ${etiqueta} <br>
        Texto: ${texto}
    `;
});

// Cuando el ratón sale de la ventana, quitamos el resaltado
document.addEventListener("mouseleave", function() {
    if (elementoAnterior) {
        elementoAnterior.classList.remove("resaltado");
    }
});
