var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

//Ya tenemos el objeto params donde deberia de venir el nombre, y construimos desde ahi al usuario

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};


socket.on('connect', function() {

    socket.emit('entrarChat', usuario, function(resp) {
        //Nos devuelve una lista de todos los usuarios conectados
        console.log('Usuarios conectados:', resp);

    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
//socket.emit('crearMensaje', {
//    usuario: 'Fernando',
//    mensaje: 'Hola Mundo'
//}, function(resp) {
//    console.log('respuesta server: ', resp);
//});

//Escuchar cambios de usuarios
//Cuando un usuario sale del chat:
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Cuando un usuario entra al chat:
socket.on('listaPersona', function(personas) {

    console.log(personas);

});

//Mensajes privados
//Accion de un cliente de escuchar un mensaje privado
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado:', mensaje);
});