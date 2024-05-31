import { Component, OnInit, ViewChild } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgModel, Validators } from '@angular/forms';

@Component({
  selector: 'app-empleado-edit',
  templateUrl: './empleado-edit.page.html',
  styleUrls: ['./empleado-edit.page.scss'],
})
export class EmpleadoEditPage implements OnInit {
  @ViewChild('codigo') codigoInput!: NgModel;
  @ViewChild('nombre') nombreInput!: NgModel;
  @ViewChild('direccion') direccionInput!: NgModel;
  @ViewChild('contacto') contactoInput!: NgModel;
  @ViewChild('cedula') cedulaInput!: NgModel;
  @ViewChild('fecha') fechaInput!: NgModel;

 

  empleado : any = {};
  id: any;
  isNew: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private readonly firestore: Firestore,
    private router: Router,
  ) { }

  

  ngOnInit() {
    this.route.params.subscribe((params:any)=>{
      console.log('params',params);
      this.id = params.id;

      if(params.id=='new'){
        this.isNew=true;
      }else{
        this.obtenerEmpleado(this.id);
      }
    });
  }

  editarEmpleado  =() => {
      const document = doc(this.firestore, "empleado", this.id);
      updateDoc(document,{
        codigo : this.empleado.codigo,
        nombre : this.empleado.nombre,
        direccion : this.empleado.direccion,
        contacto : this.empleado.contacto,
        cedula : this.empleado.cedula,
        fecha : this.empleado.fecha,
        

        
      }).then(() => {
        console.log("Fue Modificado con Éxito!!");
        this.router.navigate(['/empleado-list']);
      }).catch(error => {
        console.error("Error al editar la empleado:", error);
      });
  }
  
 guardarEmpleado() {
  if (this.isNew) {
    this.incluirEmpleado();
  } else {
    this.editarEmpleado();
  }
}

  incluirEmpleado = () =>{
    let empleadoRef = collection(this.firestore, "empleado");
    
    addDoc(empleadoRef,{
      codigo : this.empleado.codigo,
      nombre : this.empleado.nombre,
      direccion : this.empleado.direccion,
      contacto : this.empleado.contacto,
      cedula : this.empleado.cedula,
      fecha : this.empleado.fecha,
      
    }).then(doc=>{
      console.log("Registro Incluido");
      this.router.navigate(['/empleado-list']);
    }).catch(error =>{
      console.error("no se pudo registrar", error);
    })
  }

  obtenerEmpleado = async (id: string) => {
    const document = doc(this.firestore, "empleado", id);
    getDoc(document).then(doc =>{
      console.log("Registro a editar", doc.data());
      this.empleado = doc.data();
    })
  }

  eliminarEmpleado = () =>{
    const document = doc(this.firestore, "empleado", this.id);
    
    deleteDoc(document).then(doc => {
      console.log("Registro Eliminado");
      this.router.navigate(['/empleado-list']);
    }).catch(error => {
      console.error("Error al eliminar el registro:", error);
    });
  }
  



}
