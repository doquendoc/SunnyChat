export type ResponsiveType = {
    width: number,
    height: number,
    isMobile: boolean,
    tablet: boolean,
    computer: boolean,
    xxl: boolean;
    xl: boolean;
    lg: boolean;
    md: boolean;
    sm: boolean;
    xs: boolean;
}

export type ModeType = 'light' | 'dark';

export interface ITheme {
    isDark?: boolean;
    setTheme: (theme?: ModeType) => void;
    currentTheme?: ModeType;
}

export interface IStateTheme {
    isDark?: boolean
    currentTheme?: ModeType
}

export interface IUser {
    username?: string;
    email?: string;
    name?: string;
}

export interface ICrendentials {
    email?: string;
    password?: string;
}

export interface ILogin {
    isAuthenticated?: boolean;
    loading?: boolean;
    user?: IUser;
}

export interface IUseLogin {
    isAuthenticated?: boolean
    loading?: boolean
    loginUser?: (credentials: ICrendentials) => void;
    logout?: () => void;
    user?: IUser;
}

