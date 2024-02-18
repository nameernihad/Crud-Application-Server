export class AppError extends Error{
    errorCode: any;
    statusCode: number;
    constructor(message:string,statusCode:number){
        super(message)
        this.statusCode=statusCode
    }
}