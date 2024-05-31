import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Empleados', url: '/empleado-list', icon: 'person'  },
     
    

  ];
  public labels = ['Family',];
  constructor() {}
}
