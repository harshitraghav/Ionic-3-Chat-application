import { Network } from '@ionic-native/network';
import { NativeStorage } from '@ionic-native/native-storage';
import { RequestPageModule } from './../pages/request/request.module';
import { RequestPage } from './../pages/request/request';
import { LoginPageModule } from './../pages/login/login.module';
import { TabsPageModule } from './../pages/tabs/tabs.module';
import { ProfilePageModule } from './../pages/profile/profile.module';
import { GroupsPageModule } from './../pages/groups/groups.module';
import { ProfilepicPageModule } from './../pages/profilepic/profilepic.module';
import { SignupPage } from './../pages/signup/signup';
import { ProfilepicPage } from './../pages/profilepic/profilepic';
import { ProfilePage } from './../pages/profile/profile';
import { PasswordresetPage } from './../pages/passwordreset/passwordreset';
import { GroupsPage } from './../pages/groups/groups';
import { ChatsPageModule } from './../pages/chats/chats.module';
import { TabsPage } from './../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { AuthProvider } from './../providers/auth/auth';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { config } from './app.firebaseconfig';
import { Http, HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatsPage } from './../pages/chats/chats';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { MomentModule } from 'angular2-moment';
import { GroupsProvider } from '../providers/groups/groups';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PasswordresetPage,
    SignupPage,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChatsPageModule,
    ProfilePageModule,
    GroupsPageModule,
    TabsPageModule,
    LoginPageModule,
    RequestPageModule,
    ProfilepicPageModule,
    MomentModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
            scrollAssist: true,
            autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(config)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    LoginPage,
    HomePage,
    GroupsPage,
    PasswordresetPage,
    ProfilePage,
    ProfilepicPage,
    SignupPage,
    TabsPage,
    RequestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    UserProvider,
    ImghandlerProvider,
    RequestsProvider,
    ChatProvider,
    FileChooser,
    FilePath,
    File,
    GroupsProvider,
    NativeStorage,
    Network
    
  ]
})
export class AppModule {}
