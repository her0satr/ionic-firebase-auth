import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private fireAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private storage: Storage) {

    // check if user exists
    this.storage.get('user_login').then((val) => {
      if (val != null) {
        this.user = JSON.parse(val);
        this.navCtrl.push(HomePage);
      }
    });
  }

  async Login() {
    try {
      const result = await this.fireAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result.uid) {
        this.user.uid = result.uid;
        this.storage.set('user_login', JSON.stringify(this.user));
        this.navCtrl.push(HomePage);
      }
    }
    catch(e) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'User not found.',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  Register() {
    this.navCtrl.push(RegisterPage);
  }
}
