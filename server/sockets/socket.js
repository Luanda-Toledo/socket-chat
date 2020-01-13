const { io } = require('../server');
const { Usuario } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuario();


io.on('connection', (client) => {

    //Escuchamos la funcion con info del usuario, y la imprimimos en consola
    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                err: true,
                message: 'El nombre y la sala son necesarios'
            });
        }

        //Instruccion para conectar a un usuario con una sala
        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        //Avisamos con una lista de personas quienes son los que se conectan al chat
        //client.broadcast.emit('listaPersona', usuarios.getPersonas());

        //Avisamos cuando se conectan usuarios pertenecientes a una misma sala
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

        //Retornamos las personas conectadas al chat
        callback(usuarios.getPersonasPorSala(data.sala));
    });

    //Creamos un nuevo mensaje y luego se lo emitimos al resto de los usuarios
    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

    })


    client.on('disconnect', () => {
        //Si el usuario se desconecta lo borramos de la lista
        let personaBorrada = usuarios.borrarPersona(client.id);

        //Cuando una persona se va del chat, notificamos al resto de los usuarios al respecto
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`));

        //Cuando una persona se une al chat, notificamos al resto de los usuarios
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    //Mensajes privados
    //La accion del servidor cuando alguien quera mandar un mensaje privado a alguien.
    client.on('mensajePrivado', (data) => {

        //Primero necesitamos saber que persona es la que esta mandando el mensaje
        let persona = usuarios.getPersona(client.id);

        //Enviamos ese mensaje
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });


});