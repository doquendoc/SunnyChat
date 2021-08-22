import {ICrendentials, IUser} from "../../helpers/hooks/interface.hooks";

interface ISession {
    isAuthenticated: boolean
    loading: boolean
    user?: IUser;
}

export interface ISessionContext {
    isAuthenticated?: boolean
    loading?: boolean
    loginUser?: (credentials: ICrendentials) => Promise<IUser>;
    logout?: () => void;
    registerUser?: (credentials: any) => void;
    user?: IUser;
    setSession?: (session: ISession) => void;
    isSuperAdmin?: () => boolean;
}
