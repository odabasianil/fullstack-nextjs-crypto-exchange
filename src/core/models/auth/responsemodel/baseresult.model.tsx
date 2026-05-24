export interface BaseResult<T> {
    messageList: any[];
    data: T;
    success: boolean;
    error: boolean;
    warning: boolean;
}