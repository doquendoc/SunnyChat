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
