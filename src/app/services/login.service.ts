import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

   

  login(JwtRequest:any): Observable<any> {

    console.log("Login service= "+JwtRequest);
    return this.http.post(`${baseUrl}/login-token`, JwtRequest);
  }

  

  registerUser(user: any, image?: File): Observable<any> {
    const formData = new FormData();
   

    formData.append('user', new Blob([JSON
      .stringify(user)], {
      type: 'application/json'
    }));

    if (image) {
      formData.append('image', image);
    }
    return this.http.post(`${baseUrl}/users/register`, formData);
  }

  public guardarToken(token:any){
    localStorage.setItem("token",token);
  }
  public getToken(){

    return localStorage.getItem('token');
  }

  public getUserActual(): Observable<any> {
    return this.http.get(`${baseUrl}/users/user-actual`);
  }
  getProfileImage(filename: string): Observable<Blob> {
    const headers = new HttpHeaders().append('Accept', 'image/*');
    return this.http.get<Blob>(`${baseUrl}/users/profile/${filename}`, { headers: headers, responseType: 'blob' as 'json' });
  }

}
