import { useReducer } from "react";

import { CHANGE, BLUR } from "../utils/types";
import { validateInput } from "../utils/form-validations";

const reducer = (state, action) => {
    const { name, value, checked, type, id, touched, validations } = action.payload
    const newState = { ...state }
    const newInput = newState.inputs[name]

    switch(action.type) {
        case CHANGE:
            newInput.value = value
            if(newInput.touched) {
                newInput.error = validateInput(newInput)
            }
            return newState
        case BLUR:
            newInput.touched = true
            if(validations && validations.length) {
                newInput.error = validateInput(newInput)
            }
            return newState
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
        // const { name, value } = e.target
        // const { touched, validations } = formState.inputs[name]
        // const payload = { name, value, touched, validations }
        // dispatch({ type: BLUR, payload })
    }

    return [formState, changeHandler, blurHandler]
}