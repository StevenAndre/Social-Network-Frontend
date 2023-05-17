import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http:HttpClient) { }

  getCommentsOfPub(pubId:any): Observable<any>{

    return this.http.get(`${baseUrl}/comments/post/${pubId}`);

  }

  saveCometario(pubId:any,comentario:any): Observable<any>{

    return this.http.post(`${baseUrl}/comments/create/${pubId}`,comentario);

  }


}
