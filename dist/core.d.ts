import { AxiosRequestConfig, AxiosResponse } from 'axios';
export interface IInterceptor {
    request?: {
        onFulfilled?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
        onRejected?: (error: any) => any;
    };
    response?: {
        onFulfilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
        onRejected?: (error: any) => any;
    };
}
export default function (options: {
    enableBlockUI: boolean;
    baseURL?: string;
    interceptors?: IInterceptor[];
}): import("axios").AxiosInstance;
