import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'mail' },
    { title: 'Partners', url: '/folder/partners', icon: 'paper-plane' },
    { title: 'Customers', url: '/folder/customers', icon: 'person' },
    { title: 'Add Category', url: '/folder/add-vehicles', icon: 'add' },

  ];
  constructor() {}
}
