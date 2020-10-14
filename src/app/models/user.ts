export class User {
    idUsuario:      String;
    intTipoUsuario: BigInteger;
    strUsuario:     String;
    strPassword:    String;
    intNumIntentos: BigInteger;
    bitActivo:      boolean;

    constructor(idUsuario, intTipoUsuario, strUsuario, strPassword, intNumIntentos, bitActivo){
        this.idUsuario=idUsuario;
        this.intTipoUsuario=intTipoUsuario;
        this.strUsuario=strUsuario;
        this.strPassword=strPassword;
        this.intNumIntentos=intNumIntentos;
        this.bitActivo=bitActivo;
    }
}
