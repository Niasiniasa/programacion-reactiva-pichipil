import { Injectable } from "@angular/core";
import { Users } from "src/app/dashboard/pages/users/repository/users.repository";

@Injectable()
export class UserService {
    constructor(){ }
  
    public get(pageSize: number){
        return Users.slice(0, pageSize); //Users es una lista estatica de usuarios y Slice me devuelve los elementos desde la posicion 0 hasta la posicion pageSize
       
    }
}