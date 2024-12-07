import { useEffect, useState } from "react";
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { MdOutlineCancel } from "react-icons/md";

import Backdrop from "./Backdrop";
import Button from "./Button";
import { modalSliceActions, onConfirm, onCancel } from "../store";

export default function NewModal() {
    const dispatch = useDispatch()
    const { show, header, body } = useSelector(state => state.modal)
    const [showModal, setShowModal] = useState(false)
    const [applyTransition, setApplyTransition] = useState(false)

    useEffect(() => {
        if(show) {
            openModal()
        }
    }, [show])

    const openModal = () => {
        setShowModal(true)
        setTimeout(() => setApplyTransition(true), 100)
    }

    const closeModal = () => {
        setApplyTransition(false)
        setShowModal(false)
        dispatch(modalSliceActions.hideModal())
    }

    const onOk = () => {
        dispatch(onConfirm())
        setApplyTransition(false)
        setShowModal(false)
        setTimeout(() => {
            dispatch(modalSliceActions.hideModal())
        }, 300);
    }

    const onCancelled = () => {
        dispatch(onCancel())
        setApplyTransition(false)
        setShowModal(false)
        setTimeout(() => {
            dispatch(modalSliceActions.hideModal())
        }, 300);
    }

    const modalContent = createPortal( 
        <>
            <Backdrop onClick={closeModal} applyTransition={applyTransition} />
            <div className={`fixed top-[50%] left-[50%] -translate-x-[50%] transition-all duration-300 ease-in max-h-[50%] h-[30%] min-w-[80%] md:min-w-[50%] z-30 rounded-2xl opacity-100 bg-white
                ${!applyTransition ? '-translate-y-[105%] opacity-0' : '-translate-y-[100%] opacity-100' }`}>
                <div className="flex flex-col h-full justify-between">   
                    <div className="flex flex-col h-full p-2">
                        <div className="m-2 flex justify-between">
                            <h3 className='text-2xl font-semibold truncate max-w-xl'>{header}</h3>
                            <MdOutlineCancel onClick={closeModal} className="text-red-500 cursor-pointer font-bold" />
                        </div>
                        <hr className='mx-2' />
                        <div className="flex-grow p-2 overflow-scroll">
                            <p className='text-slate-600 font-semibold'>{body}</p>
                        </div>
                        <hr className='mx-2' />
                        <div className="flex justify-end items-center gap-4 mx-2 mt-2">
                            <Button type="button" onClick={onCancelled} text="cancel" className="border-2 border-purple-500 !text-purple-700 h-10 flex items-center rounded-3xl shadow-sm" />
                            <Button type="button" onClick={onOk} text="ok" className="bg-purple-600 h-10 flex items-center rounded-3xl shadow-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </>, 
        document.getElementById('new_modal_portal'))

    return <>
        {showModal && modalContent}
    </>
}
