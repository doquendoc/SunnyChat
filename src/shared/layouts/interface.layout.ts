export interface ILayoutState {
    collapsed?: boolean;
    visibleSettings?: boolean;
}

export interface ILayoutProvider {
    collapsed?: boolean;
    visibleSettings?: boolean;
    setOptionLayout?: (options: ILayoutState) => void
}
