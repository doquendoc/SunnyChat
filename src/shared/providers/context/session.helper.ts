import jwt_decode from "jwt-decode";
import {ICrendentials, IUser} from "../../helpers/hooks/interface.hooks";
import fakeUsers from "./fakeUsers.json";

export const userDecode = (accessToken: string) => {
    return {...(jwt_decode(accessToken) as any)}
}
// todo: fake api data
export function findUser(credentials: ICrendentials): IUser {
    const {password, email} = credentials;
    const response = (fakeUsers as IUser & any).find((user: IUser) => user.email === email && user.password === password)
    return response || undefined
}

export function createUser(credentials: any) : IUser {
    const {email, name, userName, password} = credentials;
    let userList: [] = JSON.parse(localStorage.getItem('userList'))
    if(!userList){
        userList= [];
    }
    else {
       if(!(userList.find((user: IUser) => {user.email === email}))){
           const clientID = Math.random();
            let user: IUser = {
                email: email,
                name: name,
                password: password,
                username: userName,
                clientID: clientID.toString()
            }
       }
    }
    return '' || undefined
}
