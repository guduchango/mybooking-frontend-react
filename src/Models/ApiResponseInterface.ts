
export interface    ApiResponseInterface<T> {
    data : {
        data: T;
        errors: [];
        status:number
    }
}