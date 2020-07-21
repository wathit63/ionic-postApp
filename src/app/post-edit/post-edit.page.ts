import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import {PostService} from '../api/post/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.page.html',
  styleUrls: ['./post-edit.page.scss'],
})
export class PostEditPage implements OnInit {

  constructor(private postService: PostService,public modalCtrl: ModalController,private storage: Storage) { }


  @Input() user_signin_name: string;
  @Input() data_content: string;
  @Input() data_idPost: string;

  content:any;

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  putDataPost(data_idPost:any,data_content:any){
  	this.postService.putData(data_idPost,data_content).subscribe(res => {
      console.log(res);
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
