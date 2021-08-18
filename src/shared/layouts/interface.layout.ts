export interface ILayoutState {
    collapsed?: boolean;
    visibleSettings?: boolean;
}

export interface ILayoutProvider {
    isAuthenticated?: boolean
    collapsed?: boolean;
    visibleSettings?: boolean;
    setOptionLayout?: (options: ILayoutState) => void
}
