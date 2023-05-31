import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVehiclesPageRoutingModule } from './add-vehicles-routing.module';

import { AddVehiclesPage } from './add-vehicles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVehiclesPageRoutingModule
  ],
  declarations: [AddVehiclesPage]
})
export class AddVehiclesPageModule {}
