import { Component ,Pipe,PipeTransform} from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
moment.locale('th'); 

import {PostService} from '../api/post/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

@Pipe({
	name:'momentjs'
})

export class ProfilePage implements PipeTransform {
  user_signin_name:any;
	user_signin_avatar:any;
  user_signin_id:any;
  //
  resultsPost:any;

  constructor(private postService: PostService,public actionSheetController: ActionSheetController,private storage: Storage,public navCtrl:NavController) { }

  ionViewWillEnter(){
  	this.loadStorageUser()
  }

  loadStorageUser(){
    this.storage.get('user').then((val) => {
    this.user_signin_name = val.u_name;
    this.user_signin_avatar = val.u_avatar;
    this.user_signin_id = val._id;
      console.log('profile Your user is', val);
    this.listDataProfile()
    });
  }

  listDataProfile(){
    this.resultsPost = this.postService.listProfilePost(this.user_signin_id);
    console.log("resultsPost",this.resultsPost)
  }

  transform(value:string,...args){
  	return moment(value).fromNow();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  logout(){
  	this.storage.clear();
  	this.navCtrl.navigateRoot('/signup')
  }

}
