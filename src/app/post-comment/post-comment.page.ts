import { Component,Pipe,PipeTransform,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
moment.locale('th'); 

import {CommentService} from '../api/comment/comment.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.page.html',
  styleUrls: ['./post-comment.page.scss'],
})

@Pipe({
  name:'momentjs'
})

export class PostCommentPage implements PipeTransform {

  constructor(public modalCtrl: ModalController,private commentService:CommentService) { }

  transform(value:string,...args){
    return moment(value).fromNow();
  }

  @Input() data_idPost: string;
  @Input() data_u_id: string;
  @Input() data_u_name: string;
  @Input() countComment: string;

  itemsComment:any;


  ionViewWillEnter(){
  	this.getDataComment()
  }

  async getDataComment(){
  	// let p_id = this.data_idPost
  	await this.commentService.getData(this.data_idPost)
    .subscribe(res => {
    	if(res == undefined){
      		console.log('no');
    	}else{
      		this.itemsComment = res
      		console.log('res',res);
    	}
    },err => {
      console.log(err);
    });
  }

  async postDataComment(content:any){
    let p_id = this.data_idPost
    let u_id = this.data_u_id
    let u_name = this.data_u_name
    let count_Comment = this.countComment
    await this.commentService.postData(p_id,u_id,u_name,content)
    .subscribe(res => {
      console.log('ok');
      this.putDataComment(p_id,count_Comment)
    },err => {
      console.log(err);
    });
  }

  async putDataComment(id_post:any,count_Comment:any){
    await this.commentService.putData(id_post,count_Comment).subscribe(res => {
      console.log(res);
      this.ionViewWillEnter()
    }, err => {
      console.log(err);
    });
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


}
