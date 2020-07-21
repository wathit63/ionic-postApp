import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostCommentPage } from './post-comment.page';

const routes: Routes = [
  {
    path: '',
    component: PostCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostCommentPageRoutingModule {}
