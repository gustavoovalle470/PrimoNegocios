import { Domain } from 'domain';
import { User } from './user';

/**
 * Esta clase define la forma como se modela una empresa.
 */
export class Company {
    idEmpresa: number;
    strIdentificacion: string;
    strRazonSocial: string;
    dtmFechaFundacion: Date;
    imgLogo: Blob;
    myUsuario: User;
    myDominio:Domain;
}
