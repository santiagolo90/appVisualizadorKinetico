import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { LindasPage } from '../lindas/lindas';
import { FeasPage } from '../feas/feas';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { LoadingController } from 'ionic-angular';
import { ToastController,App } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario:string;
  image: string = null;
  image2: string = null;

  cosasLindas : Array <any> = [];
  cosasFeas : Array <any> = [];
  images: Array <any> = [];
  photo: Array <any> = [];
  base64Img: Array <any> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              public afDB: AngularFireDatabase,
              private MiAuth:AngularFireAuth,
              private imagePicker: ImagePicker,
              private base64: Base64,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              public appCtrl: App) {
              
                //this.usuario = navParams.get("usuario");
              }

  ionViewDidLoad(){
  console.log('Traigo el usuario desde la pagina tabs');
  console.log( this.usuario = this.navParams.data);
  }

  getUserID(){
    //console.log(this.MiAuth.auth.currentUser.uid);
    return this.MiAuth.auth.currentUser.uid;
  }
  getEmail(){
  //console.log(this.MiAuth.auth.currentUser.email);
  return this.MiAuth.auth.currentUser.email;
  }


  obtenerSitio(){
    //var a = this.afDB.database.ref('relevamientoVisual/');
    //console.log(this.afDB.database.ref('relevamientoVisual/'+'cosasLindas'));
    //console.log('LogGG '+ a.path);
    this.afDB.list('/relevamientoVisual', { preserveSnapshot: true})
    .subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log("tipo: "+snapshot.val().tipo);
        console.log("usuario: "+snapshot.val().usuario);
        
        
      });
    })
  }


  getPictureCosasLindas(){
    let options: CameraOptions = {
      // destinationType: this.camera.DestinationType.DATA_URL,
      // targetWidth: 1000,
      // targetHeight: 1000,
      // quality: 100
      quality: 50,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 800,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      // this.cosasLindas.push(
      //   {"usuario":this.usuario,"foto":this.image}
      // );
      this.guardaFotosFirebase(this.image,"cosaLinda");

      this.navCtrl.push(LindasPage);
    })
    .catch(error =>{
      console.error( error );
    });
    console.log(this.cosasLindas);
  }

  guardaCosasLindas(foto:string){
    //let hora = Date.now();
    let sitio  = {"id":this.getUserID(),"usuario":this.getEmail(),tipo:"CosaLinda","foto":foto}
    return this.afDB.database.ref('relevamientoVisual/').push(sitio);
  }

  getPictureCosasFeas(){
    let options: CameraOptions = {
      // destinationType: this.camera.DestinationType.DATA_URL,
      // targetWidth: 1000,
      // targetHeight: 1000,
      // quality: 100
      quality: 50,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 800,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      // this.cosasLindas.push(
      //   {"usuario":this.usuario,"foto":this.image}
      // );
      this.guardaFotosFirebase(this.image,"cosaFea");

      this.navCtrl.push(FeasPage);
    })
    .catch(error =>{
      console.error( error );
    });
    console.log(this.cosasLindas);
  }

  guardaFotosFirebase(foto:string,tipo:string){
    //let hora = Date.now();
    let sitio  = {"id":this.getUserID(),"usuario":this.getEmail(),"tipo":tipo,"foto":foto}
    return this.afDB.database.ref('relevamientoVisual/').push(sitio);
  }


  //  obtenerLindasDeGaleriaLindas(){ 
  //   let options = {
  //     maximumImagesCount: 8,
  //     width: 800,
  //     height: 600,
  //     quality: 50
  //   }
  //   this.imagePicker.getPictures(options).then((results) => {
  //     for (var i = 0; i < results.length; i++) {
  //         //console.log('Image URI: ' + results[i]);
  //         this.base64.encodeFile(results[i]).then((base64File: string) => {
  //           console.log("base64File",base64File);
  //           this.guardaFotosFirebase(base64File,"cosaLinda");
  //         }, (err) => {
  //           console.log(err);
  //         });

  //     }
  //   }, (err) => { 
  //     console.error( err );
  //   });
  //  }

  obtenerLindasDeGaleria(lugar:string){ 
    let options = {
      maximumImagesCount: 8,
      width: 800,
      height: 600,
      quality: 50,
      outputType: 1
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.photo[i] = results[i];
          this.base64Img[i] = `data:image/jpeg;base64,` + results[i];
          this.images[i] = `data:image/jpeg;base64,${ results[i]}`;
          console.log(this.base64Img);
          console.log(this.photo);
          console.log(this.images);
          this.guardaFotosFirebase(this.base64Img[i],lugar);


      }
      if (lugar == "cosaLinda") {
        this.navCtrl.push(LindasPage);
      }else{
        this.navCtrl.push(FeasPage);
      }
    }, (err) => { 
      console.error( err );
    });

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
            //window.location.reload();
            //this.navCtrl.setRoot(LoginPage);
            this.appCtrl.getRootNav().setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
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
      closeButtonText:"cerrar",
      cssClass: color,
      message: miMsj,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  
  /*
   obtenerLindasDeGaleria(lugar:string){ 
    let options = {
      maximumImagesCount: 8,
      width: 800,
      height: 600,
      quality: 50,
      outputType: 1
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          //console.log('Image URI: ' + results[i]);
          this.base64.encodeFile(results[i]).then((base64File: string) => {
            console.log("base64File",base64File);
            this.guardaFotosFirebase(base64File,lugar);
            if (lugar == "cosaLinda") {
              this.navCtrl.push(LindasPage);
            }else{
              this.navCtrl.push(FeasPage);
            }
          }, (err) => {
            console.log(err);
          });

      }
    }, (err) => { 
      console.error( err );
    });

   }
*/
  // private obtenerLindasDeGaleria (): void {
  //   let options = {
  //     maximumImagesCount: 8,
  //     width: 800,
  //     height: 600,
  //     quality: 50
  //   }
  
  //   this.MIimagePicker.getPictures(options).then(
  //     file_uris => this._navCtrl.push(GalleryPage, {images: file_uris}),
  //     err => console.log('uh oh')
  //   );
  // }
  // getPictureCosasLindas2(){
  //   this.usuario = this.navParams.get("usuario");
  //   this.cosasLindas.push(
  //     {"usuario":this.usuario,"foto":this.image}
  //   );
  //   console.log(this.navParams.get("usuario"));
  // }
}


