import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular';
import { ToastController,App } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the GaleriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {

  arrayImagenes:Array <any> = [];
  myPhotoURL:string ="";
  x=0;
	y=0;
  z=0;
  contador:number =0;
  tArray:number =0;
  subscription: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afDB: AngularFireDatabase,
              private MiAuth:AngularFireAuth,
              public loadingCtrl: LoadingController,
              private deviceMotion: DeviceMotion,
              public toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private vibration: Vibration,
              public appCtrl: App) {

              //this.arrayCosasLindas = navParams.get("cosasLindas");
              this.arrayImagenes = [];
              

  }

  ionViewDidLoad(){
    this.arrayImagenes = [];
    let spinner = this.cargando();
    spinner.present();  
    this.afDB.list('/relevamientoVisual', { preserveSnapshot: true})
                .subscribe(snapshots => {
                  this.arrayImagenes = [];
                snapshots.forEach(snapshot => {
                  if (snapshot.val().tipo == "cosaLinda") {
                    this.arrayImagenes.push(
                      {"foto":snapshot.val().foto});
    
                    console.log("tipo: "+snapshot.val().tipo);
                    // console.log("foto: "+snapshot.val().foto);
                  }
              });
              spinner.dismiss();
              this.tArray = this.arrayImagenes.length -1;
              console.log("tamaño del array",this.tArray );
              console.log("array: ",this.arrayImagenes);
              this.mostrarToast("Primer imagen","primeraAlert");
              this.myPhotoURL = this.arrayImagenes[this.contador].foto;
              //console.log("yPhotoURL",this.myPhotoURL);
              this.goWaves();
              
            })
          

    }
    goWaves(){
      var options = { frequency: 1000 };
      let subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration) => {
        
        this.x = acceleration.x;
        this.y = acceleration.y;
        this.z = acceleration.z;
        console.log("X: ",this.x);
        console.log("y: ",this.y);
        console.log("z: ",this.z);
        
        
        if(this.x > 6)
        {
          this.contador++
          if (this.contador<0 ||this.contador> this.tArray) {
            this.contador = 0;
          }
          console.log("contador: ",this.contador);
          //this.myPhotoURL = "assets/img/"+this.contador+".jpg";
          this.myPhotoURL = this.arrayImagenes[this.contador].foto;
          this.mostrarToast("Movimiento detectado: izquierda","izquierdaAlert");
          this.vibration.vibrate([500]);

        }
  
        if(this.x < -6)
        {
          this.contador--
          if (this.contador<0||this.contador> this.tArray) {
            this.contador = this.tArray;
          }
          console.log("contador: ",this.contador);
          
          //this.myPhotoURL = "assets/img/"+this.contador+".jpg";
          this.myPhotoURL = this.arrayImagenes[this.contador].foto;
          this.mostrarToast("Movimiento detectado: derecha","derechaAlert");
          this.vibration.vibrate([500]);
        }
        if(this.y > 9)
        {
          this.contador=0;
          //this.myPhotoURL = "assets/img/"+this.contador+".jpg";
          this.myPhotoURL = this.arrayImagenes[0].foto;
          this.mostrarToast("Movimiento detectado: primer imagen","primeraAlert");
          this.vibration.vibrate([500,250,500]);
        }
  
  
      });
    }


    cargando() {
      let loader = this.loadingCtrl.create({
        content: "Cargando...",
        duration: 3000
      });
      //loader.present();
      //return loader.present();
      return loader;
    }
    mostrarToast(miMsj:string,color:string) {
      let toast = this.toastCtrl.create({
        showCloseButton: true,
        closeButtonText:"Cerrar",
        cssClass: color,
        message: miMsj,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    cerrarSesion() {
      let alert = this.alertCtrl.create({
        title: 'Cerrar sesión',
        message: '¿Está seguro?',
        cssClass: 'infoAlert',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel click');
            }
          },
          {
            text: 'Si',
            handler: () => {
              console.log('Si click');
              this.MiAuth.auth.signOut();
              // window.location.reload();
              // this.navCtrl.setRoot(LoginPage);
              this.appCtrl.getRootNav().setRoot(LoginPage);
            }
          }
        ]
      });
      alert.present();
    }

}
