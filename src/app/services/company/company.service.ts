import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrimoURL } from 'src/app/constants/primo-url';
import { Primoconst } from 'src/app/constants/primoconst';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  
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
  getCompany(user: User){
    var URL=this.primourl.PR_COMPANY_URL;
    URL=URL.replace('userid', ""+user.idUsuario);
    console.log("URL WS: "+URL);
    return this.client.get<Company>(URL);
  }

  /**
   * Registra una nueva empresa.
   * @param newCompany Company, una nueva empresa a registrar.
   */
  newCompany(newCompany : Company){
    return this.client.post(this.primourl.PR_NEWCOMPANY_URL, newCompany);
  }
}