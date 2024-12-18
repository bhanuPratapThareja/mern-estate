import { useReducer } from "react";

import { CHANGE, BLUR, RESET } from "../utils/types";
import { validateInput, validateForm, resetForm } from "../utils/form-validations";

const reducer = (state, action) => {
    const { name, value, resetState } = action.payload
    const newState = {...state}
    const newInput = newState.inputs[name]

    switch(action.type) {
        case CHANGE:
            // console.log(1)
            newInput.value = value
            if(newInput.touched) {
                newInput.error = validateInput(newInput)           
            }
            return newState
        case BLUR:
            // console.log(2)
            newInput.touched = true
            newInput.error = validateInput(newInput)
            newState.isFormValid = validateForm(newState)
            return newState
        case RESET:
            // console.log(3)
            return { ...resetState }
        default:
            return state
    }
}

export const useForm = (initialFormState) => {
    const [formState, dispatch] = useReducer(reducer, initialFormState);

    function changeHandler(e) {
        const { name, value } = e.target
        const payload = { name, value }
        dispatch({ type: CHANGE, payload })
    }

    function blurHandler(e) {
        const { name, value } = e.target
        const { touched, validations } = formState.inputs[name]
        const payload = { name, value, touched, validations }
        dispatch({ type: BLUR, payload })
    }

    function formValidateHandler() {
        for(let key in formState.inputs) {
            const input = formState.inputs[key]
            const { name, value, touched, validations } = input
            const payload = { name, value, touched, validations }
            dispatch({ type: BLUR, payload })
        }
    }

    function formUpdateHandler(formData) {
        for(let key in formData) {
            const name = key
            const value = formData[key]
            dispatch({ type: CHANGE, payload: { name, value }})
        }
    }

    function formResetHandler(resetState) {
        dispatch({ type: RESET, payload: { resetState } })
    }

    return {
        formState,
        changeHandler, 
        blurHandler, 
        formValidateHandler, 
        formUpdateHandler,
        formResetHandler
    }
}