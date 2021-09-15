import { usuario } from 'src/app/interfaces/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient)
  {
    this.myApiUrl = "api/Usuario";
    this.myAppUrl = environment.endpoint;
  }

  saveUser(usuario: usuario): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
  }

  getUsers(): Observable<usuario[]>{
    return this.http.get<usuario[]>(this.myAppUrl + this.myApiUrl + "/getUsuarios");
  }

  cambiarPassword(cambiarPassword: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + "/cambiarPassword", cambiarPassword);
  }

}
