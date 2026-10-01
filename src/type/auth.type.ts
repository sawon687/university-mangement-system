
export interface ILogin{
    email:string
    password:string
}

export interface IRegister{
    email:string,
    password:string,
    phone:string,
    name:string,
    
}

export interface IUpdatePassword{
    email:string,
    token:string,
    password:string,
    confirmPassword:string
}