import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenCodePage } from './gencode';

@NgModule({
  declarations: [
    GenCodePage,
  ],
  imports: [
    IonicPageModule.forChild(GenCodePage),
  ],
})
export class GencodePageModule { }
