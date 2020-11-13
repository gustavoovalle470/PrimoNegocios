import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Domain } from 'src/app/models/domain';
import { PrimoURL } from 'src/app/constants/primo-url';
import { Primoconst } from 'src/app/constants/primoconst';

@Injectable({
  providedIn: 'root'
})
export class DomainServiceService {

  /** Atributos de Método **/
  primourl:PrimoURL;
  constants: Primoconst;
  
  constructor(private client: HttpClient) { 
    this.primourl=new PrimoURL();
    this.constants = new Primoconst();
  }

  getDomain(domainId:number){
    var URL=this.primourl.PR_GETDOMAIN_URL;
    URL=URL.replace('domainId', ""+domainId);
    console.log("URL WS: "+URL);
    return this.client.get<Domain[]>(URL);
  }
}
