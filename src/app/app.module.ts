import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';//agregue esto
import { LindasPage } from '../pages/lindas/lindas';
import { FeasPage } from '../pages/feas/feas';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RegistroPage } from'../pages/registro/registro';//agregue esto
import { GaleriaPage } from'../pages/galeria/galeria';//agregue esto

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
//CamaraRelevamientoVisual
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
//DeviceMotion
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Vibration } from '@ionic-native/vibration';



export const firebaseConfig = {
  //Datos FireBase
};

@NgModule({
  declarations: [
    MyApp,
    LindasPage,
    FeasPage,
    HomePage,
    TabsPage,
    RegistroPage,
    GaleriaPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LindasPage,
    FeasPage,
    HomePage,
    TabsPage,
    RegistroPage,
    GaleriaPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Camera,
    ImagePicker,
    DeviceMotion,
    Base64,
    Vibration,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
