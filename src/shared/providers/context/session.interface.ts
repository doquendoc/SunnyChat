import {ICrendentials, IUser} from "../../helpers/hooks/interface.hooks";

interface ISession {
    isAuthenticated: boolean
    loading: boolean
    user?: IUser;
}

export interface IChatContext {
    activeChanel?: any;
    userChannel?: any;
    user?: IUser;
    currentChatId?: any;
    setcurrentChatId?: (currentChatId: string) => void;
}

export interface IChatState {
    readonly userChannel?: any;
    activeChanel?: any
    currentChatId?: any;
} 


export interface ISessionContext {
    adminEmail?: string;
    isAuthenticated?: boolean
    loading?: boolean
    loginUser?: (credentials: ICrendentials) => Promise<IUser>;
    logout?: () => void;
    registerUser?: (credentials: any) => void;
    user?: IUser;
    setSession?: (session: ISession) => void;
    isSuperAdmin?: () => boolean;
}
