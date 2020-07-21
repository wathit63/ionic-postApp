import { Component,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient,HttpHeaders,HttpResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import {PostService} from '../api/post/post.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage {

  @Input() user_signin_id: string;
  @Input() user_signin_name: string;


  constructor(private postService:PostService,public modalCtrl: ModalController,private http:HttpClient,private storage: Storage,public navCtrl:NavController) { }


  ionViewWillEnter() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  postDataPost(user_signin_id:any,user_signin_name:any,content:any){
  this.postService.postData(user_signin_id,user_signin_name,content).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  // handlePost(user_signin_id:any,user_signin_name:any,content){
  // 	const httpOptions = {
  //   headers: new HttpHeaders({'Content-Type': 'application/json'})}
  // 	let body = {u_id:user_signin_id,u_name:user_signin_name,p_content: content,p_like:0,p_comment:0,p_image:"https://via.placeholder.com/500x500"};

  // 	this.http.post("http://127.0.0.1:3000/post", body,httpOptions)
  //     .subscribe(res => {
  //     	console.log("ok");
  //       this.dismiss();
  //      }, err => {
  //      	console.log(err);
  //     },
  //     () => {
  //       console.log("ok","2");
  //     });
  // }

}
