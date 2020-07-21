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
export class CommentService {

  constructor(private constants:ConstantsService,private http:HttpClient) { }



  getData(id_post:any): Observable<any>{
  	return this.http.get(this.constants.BASE_PATH+'/comment/'+id_post)
  	.pipe(
  		map(results => results['comment'])
  	);
  }

  postData(id_post:any,user_id:any,user_name:any,content:any){
  	let body = {p_id: id_post,u_id:user_id,u_name:user_name,comment_content:content};
  	return this.http.post(this.constants.BASE_PATH+'/comment', body,httpOptions);
  }

  putData(id_post:any,countComment:any){
    let totalComm = countComment +1
  	let body = {p_comment: totalComm};
  	return this.http.put(this.constants.BASE_PATH+'/comment/'+id_post, body,httpOptions);
  }

}
