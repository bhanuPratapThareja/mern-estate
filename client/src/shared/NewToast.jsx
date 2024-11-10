import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from 'react-dom';

import { SUCCESS } from "../utils/types";
import { toastSliceActions } from "../store";

export default function NewToast() {
    const dispatch = useDispatch()
    const timeoutRef = useRef(null)
    const { show, header, body, type } = useSelector(state => state.toast)
    const [showToast, setShowToast] = useState(true)
    const [toastData, setToastData] = useState({})
    const [applyTransition, setApplyTransition] = useState(show)
    const [backgroundColor, setBackgroundColor] = useState('')

    useEffect(() => {
        if(show) {
            showNotification()
            timeoutRef.current = setTimeout(() => {
                hideNotification()
            }, 3000)
        } else {
            hideNotification()
        }

        return () => {
            clearTimeout(timeoutRef.current)
        }

    }, [show])

    const showNotification = () => {
        setShowToast(true)
        setTimeout(() => {
            setApplyTransition(true)
            setToastData({ header, body })
            setBackgroundColor(type === SUCCESS ? 'bg-green-400' : 'bg-red-400')
        }, 100)
    }

    const hideNotification = () => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        // console.log(timeoutRef.current)
        setApplyTransition(false)
        setTimeout(() => {
            setShowToast(false)
            dispatch(toastSliceActions.hideToast())
        }, 600)
    }

    return (
        createPortal(
        <>
            {showToast ? <div className={`fixed top-20 right-1 z-20 transition-all duration-500 ease-in-out 
                ${!applyTransition ? 'translate-x-[100%] ' : 'translate-x-[0%] opacity-100'}`}
            >
                <div
                className={`${backgroundColor} flex shadow-md justify-between w-full max-w-sm py-5 px-6 rounded-xl mb-4 gap-4`}
                role="alert"
                >
                <div className="inline-flex space-x-3">
                    <div className="block">
                    {toastData.header && <h5 className="font-medium text-gray-700 mb-1">
                        {toastData.header}
                    </h5>}
                    {toastData.body && <p className="text-sm font-medium text-gray-600">
                        {toastData.body}
                    </p>}
                    </div>
                </div>
                <button
                    type="button"
                    className="inline-flex justify-center text-gray-700 transition-all duration-150 "
                    data-dismiss="alert"
                    onClick={hideNotification}
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
        , document.getElementById('new_toast_portal')
    ));
}
