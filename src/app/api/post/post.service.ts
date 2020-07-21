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
export class PostService {

  constructor(private constants:ConstantsService,private http:HttpClient) { }

  postData(user_signin_id:any,user_signin_name:any,content:any){
    let body = {u_id:user_signin_id,u_name:user_signin_name,p_content: content,p_like:0,p_comment:0,p_image:"https://via.placeholder.com/500x500"};

    return this.http.post(this.constants.BASE_PATH+"/post", body,httpOptions)
  }


  listData(): Observable<any>{
  	return this.http.get(this.constants.BASE_PATH+'/post')
  	.pipe(
  		map(results => results['post'])
  	);
  }

  listDataLimit(): Observable<any>{
    return this.http.get(this.constants.BASE_PATH+'/post/limit')
    .pipe(
      map(results => results['post'])
    );
  }


  listProfilePost(u_id:any){
  	return this.http.get(this.constants.BASE_PATH+'/post/user/'+u_id)
  	.pipe(
  		map(results => results['post'])
  	);
  }

  putData(id_post:any,content:any){
  	// const httpOptions = {
   //  headers: new HttpHeaders({'Content-Type': 'application/json'})}
  	let body = {p_content: content};

  	return this.http.put(this.constants.BASE_PATH+'/post/'+id_post, body,httpOptions);

  }

  deleteDataPost(_id:any) {

   return this.http.delete(this.constants.BASE_PATH+'/post/'+_id,httpOptions);
    console.log("delete",_id)
  }

}
