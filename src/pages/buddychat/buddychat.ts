import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content, LoadingController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import firebase from 'firebase';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';


/**
 * Generated class for the BuddychatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-buddychat',
  templateUrl: 'buddychat.html',
})
export class BuddychatPage {
  x: any;
  rt: string;
  time: any;
  @ViewChild('content') content: Content;
  buddy: any;
  mytime: any;
  newmessage;
  allmessages = [];
  photoURL;
  imgornot;
  constructor(public navCtrl: NavController, public navParams: NavParams, public chatservice: ChatProvider,
    public events: Events, public zone: NgZone, public loadingCtrl: LoadingController,
    public imgstore: ImghandlerProvider) {
    //  this.mytime = Date.now();
    this.buddy = this.chatservice.buddy;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollto();
    this.events.subscribe('newmessage', () => {
      this.allmessages = [];
      this.imgornot = [];
      this.zone.run(() => {
        this.allmessages = this.chatservice.buddymessages;
              this.mytime = this.allmessages[0].timestamp;

        console.log(moment(this.allmessages[0].timestamp).isAfter(new Date()));
       // this.allmessages[0].timestamp|date:'dd/MM/yyyy';
        for (var key in this.allmessages) {
          if (this.allmessages[key].message.substring(0, 4) == 'http')
          {
            this.imgornot.push(true);
                    console.log("========"+this.allmessages[0].timestamp);


            console.log(this.mytime);
            this.rt=moment().utcOffset("+05:30").format('MM-DD-YYYY');
            console.log(this.rt);
          }
          else
            this.imgornot.push(false);
        }
      })
      
      
    })
  }
 
  addmessage() {
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    })
  }

  ionViewDidEnter() {
    this.chatservice.getbuddymessages();
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

  sendPicMsg() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();
    this.imgstore.picmsgstore().then((imgurl) => {
      loader.dismiss();
      this.chatservice.addnewmessage(imgurl).then(() => {
        this.scrollto();
        this.newmessage = '';
      })
    }).catch((err) => {
      alert(err);
      loader.dismiss();
    })
  }

  

  

}