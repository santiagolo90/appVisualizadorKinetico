
import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-lindas',
  templateUrl: 'lindas.html'
})
export class LindasPage {
  arrayCosasLindas:Array <any> = [];
  usuario:string

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afDB: AngularFireDatabase,
              private MiAuth:AngularFireAuth,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {

              //this.arrayCosasLindas = navParams.get("cosasLindas");
              this.arrayCosasLindas = [];

  }
  getUserID(){
    //console.log(this.MiAuth.auth.currentUser.uid);
    return this.MiAuth.auth.currentUser.uid;
  }
  getEmail(){
  //console.log(this.MiAuth.auth.currentUser.email);
  return this.MiAuth.auth.currentUser.email;
  }

  ionViewDidLoad(){
    this.arrayCosasLindas = [];
    let spinner = this.cargando();
    spinner.present();  
    this.afDB.list('/relevamientoVisual', { preserveSnapshot: true})
                .subscribe(snapshots => {
                  this.arrayCosasLindas = [];
                snapshots.forEach(snapshot => {
                  if (snapshot.val().tipo == "cosaLinda") {
                    this.arrayCosasLindas.push({"usuario":snapshot.val().usuario},
                                                {"foto":snapshot.val().foto});
    
                    console.log("tipo: "+snapshot.val().tipo);
                    console.log("usuario: "+snapshot.val().usuario);
                    // console.log("foto: "+snapshot.val().foto);
                  }
              });
              spinner.dismiss();
            })

    }

    public porUsuarioActualLindas(){
      this.arrayCosasLindas = [];
      let spinner = this.cargando();
      spinner.present();  
      this.afDB.list('/relevamientoVisual', { preserveSnapshot: true})
                  .subscribe(snapshots => {
                    this.arrayCosasLindas = [];
                    this.usuario = this.getEmail();
                  snapshots.forEach(snapshot => {
                    if (snapshot.val().tipo == "cosaLinda" && snapshot.val().usuario == this.usuario) {
                      this.arrayCosasLindas.push({"usuario":snapshot.val().usuario},
                                                  {"foto":snapshot.val().foto});
      
                      console.log("tipo: "+snapshot.val().tipo);
                      console.log("usuario: "+snapshot.val().usuario);
                      // console.log("foto: "+snapshot.val().foto);
                    }
                });
                spinner.dismiss();
              })
    }
    public todosLindas(){
      this.arrayCosasLindas = [];
      let spinner = this.cargando();
      spinner.present();  
      this.afDB.list('/relevamientoVisual', { preserveSnapshot: true})
                  .subscribe(snapshots => {
                    this.arrayCosasLindas = [];
                  snapshots.forEach(snapshot => {
                    if (snapshot.val().tipo == "cosaLinda") {
                      this.arrayCosasLindas.push({"usuario":snapshot.val().usuario},
                                                  {"foto":snapshot.val().foto});
      
                      console.log("tipo: "+snapshot.val().tipo);
                      console.log("usuario: "+snapshot.val().usuario);
                      // console.log("foto: "+snapshot.val().foto);
                    }
                });
                spinner.dismiss();
              })
  
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
        closeButtonText:"ok",
        cssClass: color,
        message: miMsj,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  
  
  // obtenerCosasLindas(){
  //   //var a = this.afDB.database.ref('relevamientoVisual/');
  //   //console.log(this.afDB.database.ref('relevamientoVisual/'+'cosasLindas'));
  //   //console.log('LogGG '+ a.path);
  //   this.afDB.list('/relevamientoVisual', { preserveSnapshot: true})
  //   .subscribe(snapshots => {
  //     snapshots.forEach(snapshot => {
  //       console.log("tipo: "+snapshot.val().tipo);
  //       console.log("usuario: "+snapshot.val().usuario);
        
        
  //     });
  //   })
  // }

}
