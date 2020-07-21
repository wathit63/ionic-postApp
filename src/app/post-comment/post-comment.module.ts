import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostCommentPageRoutingModule } from './post-comment-routing.module';

import { PostCommentPage } from './post-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostCommentPageRoutingModule
  ],
  declarations: [PostCommentPage]
})
export class PostCommentPageModule {}
