/**
 * Esta clase contiene todas las direcciones URL que describen e invocan
 * cada uno de los servicios de PrimoApp
 */
export class PrimoURL {

    /**
     * La URL de acceso web al servidor de aplicaciones que tiene expuesto
     * cada uno de los servicios listados.
     */
    //private restServerAccess:string='http://35.202.38.48:8080/PrimoApp/';
    private restServerAccess:string='http://localhost:8080/PrimoApp/';
    
    /**
     * URL de invocacion del servicio de login, reemplazar las palabras:
     * 1. username por el usuario ingresado por el usuario
     * 2. Password por la contraseña ingresada por el usuario.
     * 3. Tipo 1 para negocios, 0 para usuarios.
     */ 
    public PR_LOGIN_URL:string=this.restServerAccess+'login/username/password/usrtype';
    
    /**
     * URL de invocacion del servicio de registro de usuarios
     */ 
    public PR_NEWUSER_URL:string=this.restServerAccess+'usuario';

    /**
     * URL de invocacion del servicio de registro de empresa
     */ 
    public PR_NEWCOMPANY_URL:string=this.restServerAccess+'empresa';
    
    /**
     * URL de consulta de empresa.
     */
    public PR_COMPANY_URL:string=this.restServerAccess+'empresa/userid';

    public PR_GETDOMAIN_URL:string=this.restServerAccess+'dominio/domainId';

    public PR_NEWCONTACT_URL:string=this.restServerAccess+'contacto';

    public PR_GETCONTACT_URL:string=this.restServerAccess+'contacto/IdEmpresa';
}
