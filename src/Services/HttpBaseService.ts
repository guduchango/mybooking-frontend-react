import { UserStorageService } from "./User/UserStorageService ";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';



export class HttpBaseService {

    private  httpMsj: string[] = [];

    public addHttpMsj(message: string): void {
        this.httpMsj.push(message)
    }

    public showHttpMsj(): string[] {
        return this.httpMsj;
    }

    public cleanHttpMsj() {
        this.httpMsj = [];
    }


    // Method to create a basic Axios instance
    public getAxios(): AxiosInstance {
        const axiosClient = axios.create({
            baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
            validateStatus: function (status) {
                console.log("status", status)
                // Considerar cualquier código de estado fuera de 2xx como un error
                return status >= 200 && status < 300;
            }
        });

        axiosClient.defaults.withCredentials = true;
        axiosClient.defaults.withXSRFToken = true;

        return axiosClient;
    }

    // Method to create an Axios instance with a Bearer token
    private getAxiosBearer(token: string): AxiosInstance {
        const axiosClient = axios.create({
            baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            validateStatus: () => true
        });

        axiosClient.defaults.withCredentials = true;
        axiosClient.defaults.withXSRFToken = true;

        return axiosClient;
    }

    private async getUserToken(){
        const userStorageService = new UserStorageService()
        const user = await userStorageService.getLastItem()
        return user.token;
    }

    // Generic GET request method using the basic Axios instance
    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const axiosInstance = this.getAxios();
        return axiosInstance.get<T>(url, config);
    }

    // Generic GET request method using the Axios instance with Bearer token
    public async getPrivate<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        console.log(await this.getUserToken())
        const axiosInstance = await this.getAxiosBearer(await this.getUserToken());
        return await axiosInstance.get<T>(url, config);
    }

    // Generic POST request method using the basic Axios instance
    public async post<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
        try{
            const axiosInstance = this.getAxios();
            console.log("axiosInstance", axiosInstance)
            return axiosInstance.post<R>(url, data, config);
        } catch (error) {
            console.log("postHttpBaseService", error)
            throw  error;
        }

    }

    // Generic POST request method using the Axios instance with Bearer token
    public async postPrivate<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
        const axiosInstance = this.getAxiosBearer(await this.getUserToken());
        return axiosInstance.post<R>(url, data, config);
    }

    // Generic POST request method using the basic Axios instance
    public async put<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
        const axiosInstance = this.getAxios();
        return axiosInstance.put<R>(url, data, config);
    }


    // Generic POST request method using the Axios instance with Bearer token
    public async putPrivate<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
        const axiosInstance = this.getAxiosBearer(await this.getUserToken());
        return axiosInstance.put<R>(url, data, config);
    }

}