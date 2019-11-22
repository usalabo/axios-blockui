import axiosBlockUI from './core';
export default axiosBlockUI({ enableBlockUI: true });
export const axiosNonBlockUI = axiosBlockUI({ enableBlockUI: false });
export { axiosBlockUI };