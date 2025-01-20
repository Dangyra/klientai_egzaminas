import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '../modals/authResponseData';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public idToken:string="";

  constructor(private http:HttpClient) { }

  public login(email:String, password:string, isLogin:boolean){
    const authType=isLogin?"signInWithPassword":"signUp";
      
      console.log(authType);
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:'+authType+'?key=AIzaSyBs_xO50b3efiNq3ttfA5miBpkdD5ui05Y',{
        email:email,
        password:password,
        returnSecureToken:true
      }).pipe(tap((response)=>{
        this.idToken=response.idToken;

      }));
  }
}
