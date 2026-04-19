import { ToastContainer, toast, type ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
};

export const showToast = {
    success: (message: string, options?: ToastOptions) =>
        toast.success(message, { ...defaultOptions, ...options }),

    error: (message: string, options?: ToastOptions) =>
        toast.error(message, { ...defaultOptions, ...options }),

    warning: (message: string, options?: ToastOptions) =>
        toast.warning(message, { ...defaultOptions, ...options }),

    info: (message: string, options?: ToastOptions) =>
        toast.info(message, { ...defaultOptions, ...options }),
};

export const Toastify = () => <ToastContainer />;
