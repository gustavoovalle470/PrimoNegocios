import { DomainType } from './domain-type';

export class Domain {
    idDominio:number;
    strDescription:string;
    tipoDominio:DomainType;
    dominioPadre:Domain;
}
