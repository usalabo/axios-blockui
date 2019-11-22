import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import blockui from '@usalabo/blockui';

export interface IInterceptor {
    request?: { onFulfilled?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>, onRejected?: (error: any) => any };
    response?: { onFulfilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>, onRejected?: (error: any) => any };
}

const requestOnFulfilledBlockUI = (config: AxiosRequestConfig): AxiosRequestConfig => {
    blockui.blockUI();
    return config;
}

const responseOnFulfilledBlockUI = (response: AxiosResponse): AxiosResponse => {
    blockui.unblockUI();
    return response;
}

const responseOnRejectedBlockUI = (error: any): Promise<any> => {
    blockui.unblockUI();
    return Promise.reject(error);
}

export default function (options: { enableBlockUI: boolean; baseURL?: string; interceptors?: IInterceptor[] }) {
    const instance = options.baseURL ? axios.create({
        baseURL: options.baseURL,
    }) : axios.create();

    const interceptors: IInterceptor[] = [
        {
            request: { onFulfilled: requestOnFulfilledBlockUI },
            response: { onFulfilled: responseOnFulfilledBlockUI, onRejected: responseOnRejectedBlockUI }
        }
    ];

    if (options.interceptors) {
        options.interceptors.forEach(interceptor => {
            interceptors.push(interceptor);
        });
    }

    interceptors.forEach(interceptor => {
        if (interceptor.request) {
            instance.interceptors.request.use(interceptor.request.onFulfilled, interceptor.request.onRejected);
        }
        if (interceptor.response) {
            instance.interceptors.response.use(interceptor.response.onFulfilled, interceptor.response.onRejected);
        }
    });

    return instance;
}