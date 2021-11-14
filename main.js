class Auto {
    constructor(marca, anio, telefono, mail, plan, compa) {
        this.marca  = marca;
        this.anio  = anio;
        this.telefono  = telefono;
        this.mail = mail;
        this.plan = plan;
        this.compa = compa;
    }}
let arrayAuto = [];
let miForm = document.querySelector("#frm");
let inputMarca = document.querySelector("#marca");

let input1  = frm.children[1].value;
let input2  = Number(frm.children[2].value);
let input3  = Number(frm.children[3].value);
let input4  = frm.children[4].value;
let input5  = frm.children[5].value;

let contenedor = document.querySelector("#datosAuto");
let displayTodos = document.querySelector("#displayTodos");
let parrafos = displayTodos.getElementsByTagName("p");
let bandera = false;


miForm.addEventListener('submit', agregarAuto);

inputMarca.focus();

function validarForm() {
     input1  = frm.children[1].value;
     input2  = Number(frm.children[2].value);
     input3  = Number(frm.children[3].value);
     input4  = frm.children[4].value;
     input5  = frm.children[5].value;
     input6  = frm.children[6].value;
       
        if (input1 == '' || input2 == '' || input3 == '' || input4 == '' || input5 == '') {
            
            Swal.fire('Error. Completá todos los campos')
        
        inputMarca.focus(); 
        bandera = false;}
        else {
            bandera = true;
        }
    }
   
    function agregarAuto (e) {
        arrayAuto=[]
        e.preventDefault();
        validarForm();
        if (bandera == true) {
          
          Swal.fire({
            title: 'Confirmacion',
            text: "Estan los datos correctamente ingresados?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, son correctos'
          }).then((result) => {
            if (result.isConfirmed) {
                
                let frm = document.getElementById('frm')
                for (let i = 1; i <= 6; i++) {
                    const inputElement = frm.children[i];
                    let inputValue=inputElement.value
                    let inputName =inputElement.name
                    let object = {
                        nombre: inputName,
                        valor: inputValue
                    }
                    arrayAuto.push(object)          
                    localStorage.setItem("autosAgregados", JSON.stringify( arrayAuto ));
                } 
                
            agregarAlDom();
            inputMarca.focus();

            }else{
                Swal.fire(
                   'No se cotizara')
            }
          })
        }
        } 
     
    function agregarAlDom() {
        autosGuardados = JSON.parse(localStorage.getItem("autosAgregados"));
        
           contenedor.innerHTML = `<div class="card text-white bg-secondary mb-3 col-sm-3 m-1 mx-auto"> 
                                  <ul class="list-group list-group-flush mx-auto">
                                  <li class="list-group-item text-white bg-primary">Marca: ${autosGuardados[0].valor}</li>
                                  <li class="list-group-item text-white bg-primary">Año: ${autosGuardados[1].valor}</li> 
                                  <li class="list-group-item text-white bg-primary">Teléfono: ${autosGuardados[2].valor}</li> 
                                  <li class="list-group-item text-white bg-primary">Email: ${autosGuardados[3].valor} </li>
                                  <li class="list-group-item text-white bg-primary">Tipo de plan: ${autosGuardados[4].valor} </li>
                                  <li class="list-group-item text-white bg-primary">Compañia de seguros: ${autosGuardados[5].valor}</li>
                                  </ul> 
                                  <div class="card-footer"> Un asesor se comunicará con usted pronto.</div> </div>`  
                                
                                       }

 const URL = "http://rubricadigital.ssn.gob.ar/api/api/generics";

const xhr = new XMLHttpRequest();
function onRequestHandler() {
    if (this.readyState === 4 && this.status === 200){
        
        const data = JSON.parse(this.response);
        const HTMLResponse = document.querySelector("#compa");

        const tpl = data.map(compania => `<option>${compania.Denominacion}</option>`);
        HTMLResponse.innerHTML = `<select><option selected class="elSelect">Selecciona la compañia de seguros</option>${tpl}</select>`
    } 
}

xhr.addEventListener("load", onRequestHandler);
xhr.open ("GET", `${URL}/getcompanias`);
xhr.send();
   