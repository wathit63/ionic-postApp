import { Component, OnInit, Input,Inject,forwardRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Tab1Page} from '../tab1/tab1.page';

import {LikeService} from '../api/like/like.service';

import { PostCommentPage } from '../post-comment/post-comment.page';



@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss']
})
export class ExploreContainerComponent implements OnInit {
  @Input() postId: string;
  @Input() userId: string;
  @Input() userName: string;
  @Input() postLike: string;
  @Input() postComment: string;
  @Input() owner_id: string;
  @Input() owner_name: string;
  


  likeCheck:any;

  constructor(private tab1:Tab1Page,private likeService: LikeService,public modalController: ModalController) { }

  ngOnInit() {
  	this.checkLike()

  }

  async ionViewWillEnter(){
  	this.checkLike()
  	this.tab1.listDataPost();
  }


  checkLike(){
  	let p_id = this.postId;
  	let u_id = this.userId;
   this.likeService.listCheckUserLikePost(p_id,u_id)
    .subscribe(res => {
      this.likeCheck = res
    	console.log("likeCheck",this.likeCheck);

    },err => {
    	console.log(err);
    })
  }


  likePost(id_post:any,id_user:any,name_user:any,like_post:any){
    this.likeService.createLikePost(id_post,id_user,name_user).subscribe(res => {
      console.log(res);
      this.updateLikePost(id_post,like_post)
    }, err => {
      console.log(err);
    });
  }


  updateLikePost(id_post:any,like_post:any){
    this.likeService.updateLikePost(id_post,like_post).subscribe(res => {
      console.log(res);
      this.ionViewWillEnter()
    }, err => {
      console.log(err);
    });
  }

  unLikePost(id_post:any,id_user:any,like_post:any){
  	this.likeService.deleteLikePost(id_post,id_user).subscribe(res => {
      console.log(res);
      this.updateUnLikePost(id_post,like_post)
    }, err => {
      console.log(err);
    });
  }

  updateUnLikePost(id_post:any,like_post:any){
	this.likeService.updateUnLikePost(id_post,like_post).subscribe(res => {
      console.log(res);
      this.ionViewWillEnter()
    }, err => {
      console.log(err);
    });
  }

  async CommentPostModal(id_post:any,owner_id:any,owner_name:any,countComment:any) {
    const modal = await this.modalController.create({
      component: PostCommentPage,
      cssClass: 'my-custom-class',
      componentProps: {
      'data_idPost': id_post,
      'data_u_id': owner_id,
      'data_u_name': owner_name,
      'countComment':countComment
      }
    });
    return await modal.present();
  }

}
