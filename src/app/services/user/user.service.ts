import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../../models/user';
import { PrimoURL } from 'src/app/constants/primo-url';
import { Observable } from 'rxjs';
/**
 * Esta clase maneja todos las operaciones que se puede realizar para 
 * los usuarios del sistema.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // URL a invocar, en esta se hacen los reemplazos.
  primourl:PrimoURL;

  constructor(private client: HttpClient) {
    this.primourl=new PrimoURL();
  }

  /**
   * Obtiene un usuario dados su nombre de usuario y su contraseña.
   * @param username nombre de usuario cargado por el usuario del aplicativo.
   * @param password contraseña ingresada por el usuario
   */
  getUser (username:string, password:string): Observable<User>{
    var URL=this.primourl.PR_LOGIN_URL;
    URL=URL.replace('username', username);
    URL=URL.replace('password', password);
    URL=URL.replace('usrtype', '1');
    console.log("URL WS: "+URL);
    return this.client.get<User>(URL);
  }
}
