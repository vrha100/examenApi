

const url = 'http://localhost:8085/api/colegio'

const listarDatos= async()=>{
    let respuesta=''
    let body = document.getElementById('contenido')

    fetch (url, {
        method:'GET',
        mode:'cors',
        headers:{"Content-type": "application/json; charset=UTF-8"}
    })



    .then((resp)=> resp.json())
   
    .then(function(data){
        //devuelve los datos
        let listaColegios= data.colegios
      
        return listaColegios.map(function(colegio){
            
            respuesta+=`<tr><td>${colegio.direccion}</td>`+
            `<td>${colegio.latitud}</td>`+
            `<td>${colegio.longitud}</td>`+
            `<td>${colegio.descripcion}</td>`+
            `<td>${colegio.fechaReporte}</td>`+
            
            `<td> <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar( ${JSON.stringify(colegio)})'>Editar</a><td><a class="waves-effect waves-light btn modal-danger red" href='#' onclick='eliminar(${JSON.stringify(colegio)})'>Eliminar</a></td></tr>`   
            body.innerHTML= respuesta 
            
        })
    })
}

const registrar = async() =>{

    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value
  
        let _colegio = {
            direccion : _direccion,
            latitud : _latitud,
            longitud : _longitud,
            descripcion : _descripcion,
         
        }
        fetch (url,{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(_colegio),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
    
         Swal.fire(
            json.msg,
            '',
            'success'
          )
    })
        
    }

const editar=(colegio)=>{
    document.getElementById('direccion').value= ''
    document.getElementById('latitud').value=''
    document.getElementById('longitud').value= ''
    document.getElementById('descripcion').value= ''
 

    document.getElementById('direccion').value= colegio.direccion
    document.getElementById('latitud').value= colegio.latitud
    document.getElementById('longitud').value= colegio.longitud
    document.getElementById('descripcion').value= colegio.descripcion



   
    
}


//Actualizar editar
const actualizar = async() =>{

    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value

        let _colegio = {
            direccion : _direccion,
            latitud : _latitud,
            longitud : _longitud,
            descripcion : _descripcion,
            //fechaReporte : _fechaReporte
        }
        fetch (url,{
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_colegio),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            alert(json.msg)
    })
}

const eliminar = (id)=>{
    if(confirm('Esta seguro de realizar la eliminacion?')== true){
  
    
            let colegio = {
                _id: id
            }
            fetch (url,{
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(colegio),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp)=> resp.json())
            .then(json => {
                alert(json.msg)
        })
       
    }
    
}

if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)

}

if(document.querySelector('#btnActualizar')){
   document.querySelector('#btnActualizar')
   .addEventListener('click',actualizar)
}




