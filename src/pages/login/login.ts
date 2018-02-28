import { PasswordresetPage } from './../passwordreset/passwordreset';
import { SignupPage } from './../signup/signup';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { usercreds } from '../../models/interfaces/usercreds';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider, 
  public loadingCtrl: LoadingController,public toastCtrl: ToastController,private nativeStorage: NativeStorage) {
    this.credentials.email='';
    this.credentials.password='';
    
    this.nativeStorage.getItem('credentials')
  .then(
    data => console.log(data),
    error => console.error(error)
  );
     /* console.log(JSON.parse(localStorage.getItem('credentials')));
var data = JSON.parse(localStorage.getItem('credentials'));
 if(localStorage.getItem('credentials')!=null){
 this.navCtrl.push(TabsPage);
 } */
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
     var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();
       this.authservice.login(this.credentials).then((res: any) => {
         console.log(res);
         this.nativeStorage.setItem('credentials', {Email: 'credentials.email', Password: 'credentials.password'})
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
         loader.dismiss();
      if (!res.code){
        this.navCtrl.setRoot('TabsPage');
      }
      else{
        toaster.setMessage('E-mail password do not match.');
      toaster.present();
        alert(res);
      }
    })
  }
passwordreset() {
    this.navCtrl.push(PasswordresetPage);
  }  

signup() {
    this.navCtrl.push(SignupPage);
}
}