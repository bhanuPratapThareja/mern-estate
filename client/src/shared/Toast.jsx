import { useState, forwardRef, useImperativeHandle } from "react";
import { createPortal } from 'react-dom';
import { SUCCESS } from "../utils/types";

const Toast = forwardRef(({ heading, body, type }, ref) => {
  const [showToast, setShowToast] = useState(false)
  const [applyTransition, setApplyTransition] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      notifyUser: () => {
        setShowToast(true);
        setTimeout(() => setApplyTransition(true), 100);
        setTimeout(() => setApplyTransition(false), 3000);
        setTimeout(() => setShowToast(false), 3500);
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
        ${!applyTransition ? 'translate-x-[1100%] opacity-0' : 'translate-x-[0%] opacity-100'}`}
      >
        <div
          className={`${backgroundColor} flex shadow-md justify-between w-full max-w-sm py-5 px-6 rounded-xl mb-4 gap-4`}
          role="alert"
        >
          <div className="inline-flex space-x-3 ">
            {/* <span className="bg-indigo-50 w-9 h-9 rounded-full flex-shrink-0 flex justify-center items-center">
              <svg
                className="w-5 h-5 text-indigo-600"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3333 4.07248V8.5181M18.3333 8.5181H13.7878M18.3333 8.5181L14.8181 5.28763C14.0039 4.49091 12.9966 3.9089 11.8903 3.59591C10.7839 3.28291 9.61444 3.24913 8.49109 3.49772C7.36774 3.74631 6.32708 4.26916 5.46622 5.0175C4.60536 5.76583 3.95236 6.71525 3.56814 7.77717M1.66663 15.9275V11.4818M1.66663 11.4818H6.21208M1.66663 11.4818L5.18178 14.7123C5.99598 15.509 7.00327 16.0911 8.10966 16.4041C9.21605 16.717 10.3855 16.7508 11.5088 16.5022C12.6322 16.2536 13.6728 15.7308 14.5337 14.9825C15.3946 14.2341 16.0476 13.2847 16.4318 12.2228"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span> */}

            <div className="block">
              {heading && <h5 className="font-medium text-gray-700 mb-1">
                {heading}
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