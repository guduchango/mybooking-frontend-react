export interface ApiResponseListInterface<T>{
    data: T[];
    errors: [];
    status:number;
}