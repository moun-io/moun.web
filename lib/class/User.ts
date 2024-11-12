export class User{
    public token:string;
    public emailVerified=true;
    public uid:string="";
    constructor(token :string){
        this.token=token;
    }
    public sendEmailVerification(){

    }
}