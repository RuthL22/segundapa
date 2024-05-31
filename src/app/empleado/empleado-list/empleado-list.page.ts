import { Component, OnInit } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from '@angular/fire/firestore';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.page.html',
  styleUrls: ['./empleado-list.page.scss'],
})


export class EmpleadoListPage implements OnInit {

  constructor( 
    private readonly firestore: Firestore,
    private alertCtrl: AlertController 
  ) { }

  listaEmpleado = new Array();
  maxResults = 15;
  ultimaEmpleadoRecuperada: any = null;
  isSearch: boolean = false;
  query = '';


  ngOnInit() {
    this.listaEmpleado = new Array();
    this.ultimaEmpleadoRecuperada = null;
    this.listarEmpleadoSinFiltro();
  }


  ionViewWillEnter() {
    this.listaEmpleado = new Array();
    this.ultimaEmpleadoRecuperada = null;
    this.listarEmpleadoSinFiltro();
  }


  listarEmpleadoSinFiltro = () => {
    console.log('Listar empleado sin filtro');
    const empleadosRef = collection(this.firestore, 'empleado');

    let q;
    if (this.ultimaEmpleadoRecuperada) {
      q = query(
        empleadosRef,
        limit(this.maxResults),
        startAfter(this.ultimaEmpleadoRecuperada)
      );
    } else {
      q = query(empleadosRef, limit(this.maxResults));
    }



    const querySnapshot = getDocs(q).then((re) => {
      if (!re.empty) {
        this.ultimaEmpleadoRecuperada = re.docs[re.docs.length - 1];

        re.forEach((doc) => {
          let empleado: any = doc.data();
          empleado.id = doc.id;
          if (!this.listaEmpleado.some((a) => a.id === empleado.id)) {
            this.listaEmpleado.push(empleado);
          }
        });
      } else {
        console.log('No hay más empleados para cargar.');
      }
    });

    console.log(this.listaEmpleado);
  };




  /*-----------------------------------------------------------------------------*/



  onIonInfinite(ev: any) {
    this.listarEmpleadoSinFiltro();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }




  //nuevo codigo para la segunda parcial

  clickSearch = () => {
    this.isSearch = true;
  };

  clearSearch = () => {
    this.isSearch = false;
    this.query = '';

    this.listaEmpleado = new Array();
    this.ultimaEmpleadoRecuperada = null;

    this.listarEmpleadoSinFiltro();
  };

  buscarSearch = (e: any) => {
    this.isSearch = false;
    this.query = e.target.value;

    this.listaEmpleado = new Array();
    this.ultimaEmpleadoRecuperada = null;
    this.listarEmpleado();
  };







  /**************************************** */










  listarEmpleado = () =>{
    console.log("listar empleados");
    const empleadosRef = collection(this.firestore, 'empleado');

    if ((this.query+"").length > 0){
      let q = undefined;
      if (this.ultimaEmpleadoRecuperada){
        q= query(empleadosRef,
          where ("nombre", ">=", this.query.toUpperCase()),
          where ("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.maxResults),
          startAfter(this.ultimaEmpleadoRecuperada));
      } else {
        q= query(empleadosRef,
          where ("nombre", ">=", this.query.toUpperCase()),
          where ("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.maxResults));
      }

      getDocs(q).then(re => {
        if (!re.empty){
          let listaEmpleado = new Array();

          //Retirar lo que no corresponde
          for (let i= 0; i < re.docs.length; i++){
            const doc : any = re.docs[i].data();
            if(doc.nombre.toUpperCase().
                  startsWith(
                      this.query.toUpperCase().charAt(0) 
            )){
              listaEmpleado.push(re.docs[i])
            }

            
          }

          this.ultimaEmpleadoRecuperada = re.docs[listaEmpleado.length-1];

            for(let i = 0; i < listaEmpleado.length; i++){
              const doc : any = listaEmpleado[i];
              let empleado : any = doc.data();
              empleado.id = doc.id;
              this.listaEmpleado.push(empleado);
            };

        }
      });

    } else {
      this.listarEmpleadoSinFiltro();
    }
  }


}
