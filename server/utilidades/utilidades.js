//Esta funcion cada vez que se cree un mensaje ademas del nombre y el mensaje nos va a devolver la fecha
const crearMensaje = (nombre, mensaje) => {

    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    };

}

module.exports = {
    crearMensaje
}