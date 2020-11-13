import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrimoURL } from 'src/app/constants/primo-url';
import { Primoconst } from 'src/app/constants/primoconst';
import { Company } from 'src/app/models/company';
import { Contact } from 'src/app/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  /** Atributos de Método **/
  primourl:PrimoURL;
  constants: Primoconst;
  
  constructor(private client: HttpClient) { 
    this.primourl=new PrimoURL();
    this.constants = new Primoconst();
  }

  /**
   * Obtiene una empresa dado un usuario registrado.
   * @param user El usuario al que pertenece la compañia.
   */
  getContact(comapny: Company){
    var URL=this.primourl.PR_GETCONTACT_URL;
    URL=URL.replace('empresaId', ""+comapny.idEmpresa);
    console.log("URL WS: "+URL);
    return this.client.get<Contact>(URL);
  }

  /**
   * Registra una nueva empresa.
   * @param newCompany Company, una nueva empresa a registrar.
   */
  newContact(newContact : Contact){
    return this.client.post(this.primourl.PR_NEWCONTACT_URL, newContact);
  }
}
