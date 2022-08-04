const fs = require('fs');

class Contenedor{
    constructor (nombre){
        this.ruta = `./${nombre}.txt`
    }

    save(object){
        let json=[], id=1;
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8',));
            json.forEach(element => {
                if (element.id>=id){
                    id = element.id + 1;
                }
            });           
        } catch (error) {
            console.log("Documento no encontrado, Se creara documento.");
        }
        object.id = id;
        object.price = Number(object.price);
        json.push(object);
        try {
            fs.writeFileSync(this.ruta, JSON.stringify(json))   
        } catch (error) {
            console.log("Error al escribir en documento");
        }

        return id;
        
    }

    getById(number){
        let json=[]
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8'));          
        } catch (err) {
            console.log(err);
        }
        json.forEach(element=>{
            if(element.id == number){
                json = element;
            }
        })
        return json
    }

    getAll(){
        let json=[]
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8'));          
        } catch (err) {
            console.log(err);
        }
        return json;
    }

    update(number, object){
        let json=[],existe=false;
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8',));        
        } catch (error) {
            console.log("Documento no encontrado, Se creara documento.");
        }

        let newJson = json.map((element)=>{
            if (element.id == number) {
                element.title = object.title
                element.price = object.price
                element.thumbnail = object.thumbnail
                existe= true
            };
            return element;
        })
        
        try {
            fs.writeFileSync(this.ruta, JSON.stringify(newJson))   
        } catch (error) {
            console.log("Error al escribir en documento");
        }

        if (existe) {
            return 'Producto Actualizado'
        }else{
            return {error: 'producto no encontrado'}
        }
    }

    deleteById(number){
        let json=[], existe=false;
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8',));          
        } catch (err) {
            console.log(err);
        }
        json = json.filter(element => {
            if (element.id == number) {
                existe= true
            } else {
                return element
            }
        }); 
        try {
            fs.writeFileSync(this.ruta, JSON.stringify(json))   
        } catch (error) {
            console.log("Error al escribir en documento");
        }

        if (existe) {
            return 'Producto Eliminado'
        }else{
            return {error: 'producto no encontrado'}
        }
    }

    deleteAll(){
        let json=[]
        try {
            fs.writeFileSync(this.ruta, JSON.stringify(json))   
        } catch (error) {
            console.log("Error al escribir en documento");
        }
    }

    length(){
        let json=[]
        try {
            json = JSON.parse(fs.readFileSync(this.ruta,'utf-8',));          
        } catch (err) {
            console.log(err);
        }
        return json.length       
    }

    randomObj(){
        let randomNum = Math.floor(Math.random()*this.length()+1);
        return this.getById(randomNum);
    }
}

module.exports = Contenedor




