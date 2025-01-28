// Definition of types used in the store to change AlertBar state
export type Severity = 'success' | 'error' | 'info' | 'warning';
export type AlertInfo = {
    open: boolean | undefined,
    severity: Severity,
    message: string,
    link?: string,
};