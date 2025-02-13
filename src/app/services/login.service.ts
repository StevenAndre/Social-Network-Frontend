import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public loginStatusSubject= new Subject<boolean>();

  login(JwtRequest: any): Observable<any> {
    console.log('Login service= ' + JwtRequest);

    this.loginStatusSubject.next(true); 
    return this.http.post(`${baseUrl}/login-token`, JwtRequest);
  }

  logout() {

    
    this.getUserActual().subscribe({
      next: (data) => {
        let usuarioId=data.id;
        this.http.post(`${baseUrl}/logout/${usuarioId}`,{}).subscribe(
          {
            next: (data) => {
              console.log("DATA LOGOUT",data);
            },
            error:err=>console.log(err)

          }
        );
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userID');
        this.loginStatusSubject.next(false); 
      },
      error:err=>console.log(err)
    });
   

   
  }

  setUsername(username:string){
    localStorage.setItem("username",username);
  }

  getUsername(){
   
   return localStorage.getItem('username');

  }

  getUSER(){
    return localStorage.getItem('userID');
  }

  registerUser(user: any, image?: File): Observable<any> {
    const formData = new FormData();

    formData.append(
      'user',
      new Blob([JSON.stringify(user)], {
        type: 'application/json',
      })
    );

    if (image) {
      formData.append('image', image);
    }
    return this.http.post(`${baseUrl}/users/register`, formData);
  }

  public guardarToken(token: any) {
    localStorage.setItem('token', token);
  }
  public getToken() {
    return localStorage.getItem('token');
  }

  public getUserActual(): Observable<any> {
    return this.http.get(`${baseUrl}/users/user-actual`);
  }
  
  getProfileImage(filename: string): Observable<Blob> {
    const headers = new HttpHeaders().append('Accept', 'image/*');
    return this.http.get<Blob>(`${baseUrl}/users/profile/${filename}`, {
      headers: headers,
      responseType: 'blob' as 'json',
    });
  }

  public isLogged() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr === undefined || tokenStr === '' || tokenStr === null) {
      return false;
    } else {
      return true;
    }
  }

  public actualizarUser(user: any, id: any, image?: File): Observable<any> {
    const formData = new FormData();

    formData.append(
      'user',
      new Blob([JSON.stringify(user)], {
        type: 'application/json',
      })
    );

    if (image) {
      formData.append('image', image);
    }
    return this.http.put(`${baseUrl}/users/update/${id}`, formData);
  }

  public conprobarPassword(password: any): Observable<boolean> {
    return this.http.post<boolean>(
      `${baseUrl}/users/password-confirm`,
      password
    );
  }


  public getChatByUSers(usernameSender:string | null,usernameReciver:string):Observable<any>{
    return this.http.get(`${baseUrl}/chat/messages/${usernameSender}/${usernameReciver}`);
  }



}
