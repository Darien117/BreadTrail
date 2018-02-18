import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TracePage } from '../pages/trace/trace';
import { MyProducePage } from '../pages/my-produce/my-produce';
import { ProduceChoicePage } from '../pages/produce-choice/produce-choice';
import { CreateShipmentPage } from '../pages/create-shipment/create-shipment';
import { BrowsePartnersPage } from '../pages/browse-partners/browse-partners';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { File } from '@ionic-native/file';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/firebaseEnvironment';
import { AngularFireAuthModule } from 'angularfire2/auth';


@NgModule({
  declarations: [
    MyApp,
    TracePage,
    MyProducePage,
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
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TracePage,
    MyProducePage,
    ProduceChoicePage,
    BrowsePartnersPage,
    CreateShipmentPage,
    TabsControllerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}