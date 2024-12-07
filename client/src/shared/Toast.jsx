import { forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom'
import { ToastContainer, toast, Slide, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { isMobile } from '../utils/device-type';

const Toast = forwardRef((props, ref) => {

    useImperativeHandle((ref), () => {
        return {
            success,
            error
        }
    })

    const success = msg => toast.success(msg.body, {
        className: "toast-custom-success",
    })

    const error = msg => toast.error(msg.body, {
        className: "toast-custom-error",
    })

    return (
        createPortal(
            <ToastContainer 
                autoClose={2000} 
                draggable={false} 
                hideProgressBar 
                closeOnClick
                pauseOnHover
                icon
                position="top-right"
                transition={isMobile() ? Flip : Slide}
            />,
            document.getElementById('toast_portal')
        )
    );
})

export default Toast