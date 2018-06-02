import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-feas',
  templateUrl: 'feas.html'
})
export class FeasPage {
  arrayCosasFeas:Array <any> = [];
  usuario:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    private MiAuth:AngularFireAuth,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

    //this.arrayCosasLindas = navParams.get("cosasLindas");

    

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
  //arrayCosasFeas:Array <any> = [];
  //this.arrayCosasFeas = [];
  let spinner = this.cargando();
  spinner.present();  
  this.afDB.list('/relevamientoVisual', { preserveSnapshot: true})
      .subscribe(snapshots => {
      this.arrayCosasFeas = [];
      snapshots.forEach(snapshot => {
        if (snapshot.val().tipo == "cosaFea") {
          this.arrayCosasFeas.push({"usuario":snapshot.val().usuario},
                                      {"foto":snapshot.val().foto});

          console.log("tipo: "+snapshot.val().tipo);
          console.log("usuario: "+snapshot.val().usuario);
          // console.log("foto: "+snapshot.val().foto);
        }
       
    });
    spinner.dismiss();
  })

  }

  public porUsuarioActualFeas(){
    this.arrayCosasFeas = [];
    let spinner = this.cargando();
    spinner.present();  
    this.afDB.list('/relevamientoVisual', { preserveSnapshot: true})
                .subscribe(snapshots => {
                  this.arrayCosasFeas = [];
                  this.usuario = this.getEmail();
                snapshots.forEach(snapshot => {
                  if (snapshot.val().tipo == "cosaFea" && snapshot.val().usuario == this.usuario) {
                    this.arrayCosasFeas.push({"usuario":snapshot.val().usuario},
                                                {"foto":snapshot.val().foto});
    
                    console.log("tipo: "+snapshot.val().tipo);
                    console.log("usuario: "+snapshot.val().usuario);
                    // console.log("foto: "+snapshot.val().foto);
                  }
              });
              spinner.dismiss();
            })
  }

  todosFeas(){
    //arrayCosasFeas:Array <any> = [];
    //this.arrayCosasFeas = [];
    let spinner = this.cargando();
    spinner.present();  
    this.afDB.list('/relevamientoVisual', { preserveSnapshot: true})
        .subscribe(snapshots => {
        this.arrayCosasFeas = [];
        snapshots.forEach(snapshot => {
          if (snapshot.val().tipo == "cosaFea") {
            this.arrayCosasFeas.push({"usuario":snapshot.val().usuario},
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

}
