//Esta clase Usuarios se va a encargar de todos los usuarios conectados
class Usuario {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {

        //Creamos el objeto persona
        let persona = { id, nombre, sala };

        //Lo agregamos al arreglo de personas
        this.personas.push(persona);

        return this.personas;

    }

    //Buscamos a la persona por el id, y mostramos la info que contiene esa persona
    getPersona(id) {

        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;

    }

    //Nos regresa todas las personas
    getPersonas() {
        return this.personas;
    }

    //Nos regresa todas las personas que se encuentran en una sala
    getPersonasPorSala(sala) {

        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;

    }

    //Eliminamos a una persona del arreglo de personas
    borrarPersona(id) {

        //Buscamos y retornamos a la persona indicada antes de sacarla del arreglo
        let personaBorrada = this.getPersona(id);

        //Este nuevo arreglo contiene solo las personas que estan activas en el chat
        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;
    }
}

module.exports = {
    Usuario
}