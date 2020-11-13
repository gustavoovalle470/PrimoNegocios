/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';

/**
 * Servicio para el manejo de las sesiones
 */
@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  /** Atributos de Clase **/
  user_in_session:User;
  user_company:Company;
  comapny_contact:Contact;

  /**
   * Constructor Vacio
   */
  constructor() { }

  /**
   * Método de Logout
   */
  logout(){
    this.user_in_session=null;
    this.user_company=null;
  }
}
