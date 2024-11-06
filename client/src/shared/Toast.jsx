import { useState, forwardRef, useImperativeHandle } from "react";
import { createPortal } from 'react-dom';
import { SUCCESS } from "../utils/types";

const Toast = forwardRef(({ header, body, type }, ref) => {
  const [showToast, setShowToast] = useState(false)
  const [applyTransition, setApplyTransition] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      notifyUser: () => {
        setShowToast(true);
        setTimeout(() => setApplyTransition(true), 100);
        setTimeout(() => setApplyTransition(false), 4000);
        setTimeout(() => setShowToast(false), 4500);
      },
      removeNotification: hideToast
    }
  }, [])

  const hideToast = () => {
    setApplyTransition(false)
    setTimeout(() => setShowToast(false), 500);
  }
  
  const backgroundColor = type === SUCCESS ? 'bg-green-400' : 'bg-red-400'
  return (
    createPortal(
      <>
      {showToast ? <div className={`fixed top-20 right-1 z-20 transition-all duration-500 ease-in-out 
        ${!applyTransition ? 'translate-x-[100%] opacity-0' : 'translate-x-[0%] opacity-100'}`}
      >
        <div
          className={`${backgroundColor} flex shadow-md justify-between w-full max-w-sm py-5 px-6 rounded-xl mb-4 gap-4`}
          role="alert"
        >
          <div className="inline-flex space-x-3">
            <div className="block">
              {header && <h5 className="font-medium text-gray-700 mb-1">
                {header}
              </h5>}
              {body && <p className="text-sm font-medium text-gray-600">
                {body}
              </p>}
            </div>
          </div>
          <button
            type="button"
            className="inline-flex justify-center text-gray-700 transition-all duration-150 "
            data-dismiss="alert"
            onClick={hideToast}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-6 h-6 "
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 17L7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div> : null}
      </>
      , document.getElementById('toast_portal')
  ));
})

export default Toast