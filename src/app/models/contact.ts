import { Domain } from './domain';
import { Company } from './company';

export class Contact {
    idContacto:         number;
    strIdentificacion:  string;
    strNombre:          string;
    strApellido:        string;
    strDireccion:       string;
    strTelefono:        string;
    strEmail:           string;
    dtmFechaNacimiento: Date;
    myEmpresa:          Company;
    myDominio:          Domain;
}
