export class validations{

    static Emptyvalid(user:string,password:string,email:string){

        let str='';

        if(user===''){
            str+='a';
        }

        if(password===''){
            str+='b';
        }else if(password.length<8){
            str+='d';
        }

        if(email===''){
            str+='c';
        }else if(!this.isValidEmail(email)){
            str+='e';
        }

        return str;

    }
    
        static emptyvalid(user:string,password:string){

        let str='';

        if(user===''){
            str+='a';
        }
        if(password===''){
            str+='b';
        }

        return str;

    }

    static isValidEmail(email: string): boolean {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
}

}