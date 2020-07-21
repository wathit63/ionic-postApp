import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators'
import {ConstantsService} from '../../constants/constants.service' 



const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})


export class LikeService {

  constructor(private constants:ConstantsService,private http:HttpClient) { }

  createLikePost(id_post:any,user_id:any,user_name:any){
  	let body = {p_id: id_post,u_id:user_id,u_name:user_name,like_type:"ถูกใจ"};
  	return this.http.post(this.constants.BASE_PATH+'/like', body,httpOptions);
  }

  updateLikePost(id_post:any,like_post:any){
    let totalLike = like_post +1
  	let body = {p_like: totalLike};
  	return this.http.put(this.constants.BASE_PATH+'/post/'+id_post, body,httpOptions);
  }

  // เช็ค user like

  listCheckUserLikePost(id_post:any,user_id:any): Observable<any>{
    return this.http.get(this.constants.BASE_PATH+'/like/check/'+id_post+'/'+user_id)
    .pipe(
      map(results => results['like'])
    );
  }


  deleteLikePost(id_post:any,id_user){
  	return this.http.delete(this.constants.BASE_PATH+'/like/'+id_post+'/'+id_user);
  }

  updateUnLikePost(id_post:any,like_post:any){
    let totalLike = like_post -1
  	let body = {p_like: totalLike};
  	return this.http.put(this.constants.BASE_PATH+'/post/'+id_post, body,httpOptions);
  }

}
