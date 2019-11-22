import axios from 'axios';
import blockui from '@usalabo/blockui';
var requestOnFulfilledBlockUI = function (config) {
    blockui.blockUI();
    return config;
};
var responseOnFulfilledBlockUI = function (response) {
    blockui.unblockUI();
    return response;
};
var responseOnRejectedBlockUI = function (error) {
    blockui.unblockUI();
    return Promise.reject(error);
};
export default function (options) {
    var instance = options.baseURL ? axios.create({
        baseURL: options.baseURL,
    }) : axios.create();
    var interceptors = [
        {
            request: { onFulfilled: requestOnFulfilledBlockUI },
            response: { onFulfilled: responseOnFulfilledBlockUI, onRejected: responseOnRejectedBlockUI }
        }
    ];
    if (options.interceptors) {
        options.interceptors.forEach(function (interceptor) {
            interceptors.push(interceptor);
        });
    }
    interceptors.forEach(function (interceptor) {
        if (interceptor.request) {
            instance.interceptors.request.use(interceptor.request.onFulfilled, interceptor.request.onRejected);
        }
        if (interceptor.response) {
            instance.interceptors.response.use(interceptor.response.onFulfilled, interceptor.response.onRejected);
        }
    });
    return instance;
}
//# sourceMappingURL=core.js.map