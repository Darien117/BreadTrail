import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TracePage } from '../pages/trace/trace';
import { AffirmShipmentPage } from '../pages/affirm-shipment/affirm-shipment';
import { ProduceChoicePage } from '../pages/produce-choice/produce-choice';
import { CreateShipmentPage } from '../pages/create-shipment/create-shipment';
import { BrowsePartnersPage } from '../pages/browse-partners/browse-partners';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { File } from '@ionic-native/file';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase} from 'angularfire2/database';
import { ContractProvider } from '../providers/contract/contract';
import { Web3Service }        from '../providers/web3-service/web3-service';
import { HttpClientModule, HttpClient} from '@angular/common/http'; 
import {HttpModule} from '@angular/http'


@NgModule({
  declarations: [
    MyApp,
    TracePage,
    AffirmShipmentPage,
    ProduceChoicePage,
    BrowsePartnersPage,
    CreateShipmentPage,
    TabsControllerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TracePage,
    AffirmShipmentPage,
    ProduceChoicePage,
    BrowsePartnersPage,
    CreateShipmentPage,
    TabsControllerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContractProvider,
    Web3Service,
    HttpModule,
    HttpClient
  ]
})
export class AppModule {}