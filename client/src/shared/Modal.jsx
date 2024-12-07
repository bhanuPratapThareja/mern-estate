import { useState, forwardRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'

import Backdrop from './Backdrop';
import Button from './Button';

const Modal = forwardRef((props, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [applyTransition, setApplyTransition] = useState(false)

    useImperativeHandle(ref, () => {
        return {
            showModal: onOpenModal,
            closeModal: onCancel
        }
    }, [])

    const onOpenModal = () => {
        setShowModal(true);
        setTimeout(() => setApplyTransition(true), 0);
    }

    const onCancel = () => {
        setApplyTransition(false)
        setShowModal(false)
    }

    const onOk = () => {
        if(props.onPressOk) props.onPressOk()
        setShowModal(false)
    }

    const modalContent = createPortal(
        <>
            <Backdrop onClick={onCancel} applyTransition={applyTransition} />
            <div className={`fixed top-[50%] left-[50%] -translate-x-[50%] transition-all duration-300 ease-in max-h-[50%] h-[30%] min-w-[80%] md:min-w-[50%] z-30 rounded-2xl opacity-100 bg-white
                ${!applyTransition ? '-translate-y-[110%] opacity-0' : '-translate-y-[100%] opacity-100' }`}>
                <div className="flex flex-col h-full justify-between">   
                    <div className="flex flex-col h-full p-2">
                        <div className="m-2">
                            <h3 className='text-2xl font-semibold truncate max-w-xl'>{props.header}</h3>
                        </div>
                        <hr className='mx-2' />
                        <div className="flex-grow p-2 overflow-scroll">
                            <p className='text-slate-600 font-semibold'>{props.body}</p>
                        </div>
                        <hr className='mx-2' />
                        <div className="flex justify-end items-center gap-4 mx-2 mt-2">
                            <Button type="button" onClick={onCancel} className="border-2 border-purple-500 !text-purple-700 h-10 flex items-center rounded-3xl shadow-sm">
                                Cancel
                            </Button>
                            <Button type="button" onClick={onOk} className="bg-purple-600 text-white h-10 flex items-center rounded-3xl shadow-sm">
                                Ok
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('modal_portal')
    )

    return <>
        {showModal && modalContent}
    </>
})

export default Modal