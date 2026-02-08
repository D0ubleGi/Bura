export class Functions{
    
    static generateid(){

        const str = '1234567890';

        let id ='';
        let idi='';

        for( let j=0;j<6;j++){
            id+=str[Math.floor(Math.random()*str.length)];
        }

        idi+= id + str[Math.floor(Math.random()*str.length)];

        return [id,idi];
    }

}