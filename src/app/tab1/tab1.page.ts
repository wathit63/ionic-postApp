import { Component,Pipe,PipeTransform } from '@angular/core';
import {Observable} from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
moment.locale('th'); 

import {PostService} from '../api/post/post.service';
import {LikeService} from '../api/like/like.service';

import { PostPage } from '../post/post.page';
import { PostEditPage } from '../post-edit/post-edit.page';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

@Pipe({
	name:'momentjs'
})
export class Tab1Page implements PipeTransform {

  constructor(private postService: PostService,private likeService: LikeService,public modalController: ModalController,
    public actionSheetController: ActionSheetController,private storage: Storage,public alertController: AlertController) {
 
  }

  results :Observable<any>;
  user_signin_id: any;
  user_signin_name:any;

  transform(value:string,...args){
  	return moment(value).fromNow();
  }

 async ionViewWillEnter(){
  	this.listDataPost()
    this.loadU_id();
  }

  loadU_id(){
    this.storage.get('user').then((val) => {
    this.user_signin_id = val._id;
    this.user_signin_name = val.u_name;
    });
  }

  async listDataPost(){
    
    await this.postService.listData()
    .subscribe(res => {
      this.results = res
      console.log('res',res);
    },err => {
      console.log(err);
    });
  }

  




  // async doRefresh(event) {
  //   await this.postService.listDataLimit()
  //   .subscribe(res => {
  //     this.results = res
  //     console.log('res',res);
  //   },err => {
  //     console.log(err);
  //   },() =>{
  //     event.target.complete();
  //   });
  // }


  async ActionSheet(user_idPost:any,id_post:any,user_signin_name:any,content:any) {
    if(user_idPost === this.user_signin_id){
      const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
        cssClass: 'my-custom-class',
        buttons: [
        {
          text: 'แก้ไขโพสต์',
          role: 'destructive',
          icon: 'create-outline',
          handler: () => {
            this.EditPostModal(id_post,user_signin_name,content);
          }
        },{
          text: 'ลบ',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            this.AlertConfirm(id_post)
            console.log('Delete clicked');
          }
        }]
      });
      await actionSheet.present();
    }else{
       const actionSheet = await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [{
          text: 'ไม่มีลบ',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        },{
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
  }


  async PostModal(user_signin_id:any,user_signin_name:any) {
    const modal = await this.modalController.create({
      component: PostPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'user_signin_id': user_signin_id,
        'user_signin_name': user_signin_name
      }
    });
    return await modal.present();
  }

  async EditPostModal(id_post:any,user_signin_name:any,content:any) {
    const modal = await this.modalController.create({
      component: PostEditPage,
      cssClass: 'my-custom-class',
      componentProps: {
      'user_signin_name': user_signin_name,
      'data_content': content,
      'data_idPost': id_post
      }
    });
    return await modal.present();
  }


  async AlertConfirm(id_post:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ลบโพสต์หรือไม่',
      message: 'คุณต้องการลบโพสต์นี้ใช่ไหม',
      buttons: [
      {
          text: 'ลบ',
          handler: () => {
            console.log('Confirm Okay',id_post);
            this.deleteDataPost(id_post);

          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }


  deleteDataPost(id_post:any){
    this.postService.deleteDataPost(id_post).subscribe(res => {
      console.log(res);
      this.ionViewWillEnter()
    }, err => {
      console.log(err);
    });
  }


  



}
