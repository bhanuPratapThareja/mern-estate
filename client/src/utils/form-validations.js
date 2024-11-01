import { VALIDATORS } from "./types"

export const validateInput = input => {
    console.log(input)
    for(let validation of input.validations){
       if(!input.value && validation === VALIDATORS.REQUIRED) {
        return validateRequired(input)
       }
       if(input.value && validation === VALIDATORS.EMAIL) {
        return validateEmail(input)
       }
       if(input.value && input.value.length < input.minLength && validation === VALIDATORS.MIN_LENGTH) {
        console.log('check min length')
        return validateMinLength(input)
       }
       if(input.value && validation === VALIDATORS.ALPHA_NUMERIC) {
        return 'alpha numeric error'
       }
    }
}

const validateRequired = input => {
    let error = ''
    if(!input.value) {
        error = `${input.displayName} is required`
    }
    return error
}

const validateEmail = input => {
    let error = ''
    const isEmailValid = input.value.match(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i)
    if(!isEmailValid) {
        error = `${input.displayName} is not valid`
    }
    return error
}

const validateMinLength = input => {
    let error = ''
    if(input.value.length < input.minLength) {
        error = 'min length error' 
    }
    return error
}

const validateAlphaNumeric = input => {

}