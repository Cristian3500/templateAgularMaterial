import { usuario } from './../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient)
  {
    this.myApiUrl = "api/Login";
    this.myAppUrl = environment.endpoint;
  }

  login(usuario: usuario):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
  }

  setLocaStorage(data: any): void{
    localStorage.setItem('token',data);
  }

  getNombreUsuario(): any{
    return this.getTokenDecot().sub;
  }

  getDireccionUsuario(): any{
    return this.getTokenDecot().direccion;
  }

  getImagenUsuario(): any{
    return this.getTokenDecot().imagenperfil;
  }

  getTokenDecot(): any{
    const helper = new JwtHelperService();
    var token  = localStorage.getItem('token');
    if(!token){ token = ""}
    const decodedToken = helper.decodeToken(token);
    return decodedToken;
  }

  eliminarLocalStorage(): void{
    localStorage.clear();
  }

  getToken(): any{
    return localStorage.getItem('token');
  }

}
