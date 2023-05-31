import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVehiclesPage } from './add-vehicles.page';

const routes: Routes = [
  {
    path: '',
    component: AddVehiclesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVehiclesPageRoutingModule {}
