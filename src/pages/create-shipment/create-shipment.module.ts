import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateShipmentPage } from './create-shipment';

@NgModule({
  declarations: [
    CreateShipmentPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateShipmentPage),
  ],
})
export class CreateShipmentPageModule {}
