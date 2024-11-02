import { VALIDATORS } from "./types";

const TEXT_INPUTS = ['text', 'email', 'password']

const validateEmail = (email) => {
  const isEmailValid = email.match(
    /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i
  );
  return isEmailValid;
};

const validateAlphaNumeric = (value) => {
  const minChars = 4
  const regexString = `^(?=.*\\d)(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z]).{${minChars},}$`
  const regex = new RegExp(regexString)
  const isAlphaNumericValid = regex.test(value);
  return isAlphaNumericValid;
};

export const validateInput = (input) => {
  let error = "";
  for (let validation of input.validations) {
    if (!input.value && validation === VALIDATORS.REQUIRED) {
      // console.log("REQUIRED");
      error = `${input.displayName} is required`;
    }

    if (input.value && TEXT_INPUTS.includes(input.type)) {
      if (validation === VALIDATORS.EMAIL) {
        // console.log("EMAIL");
        if (!validateEmail(input.value)) {
          error = `${input.displayName} is not valid`;
        }
      }

      if (validation === VALIDATORS.ALPHA_NUMERIC) {
        // console.log("ALPHA_NUMERIC");
        if (!validateAlphaNumeric(input.value)) {
          // console.log("ALPHA_NUMERIC_INNER");
          error = `${input.displayName} must be Alpha Numeric`;
        }
      }

      if (validation === VALIDATORS.MIN_LENGTH) {
        // console.log("MIN_LENGTH");
        if (input.minLength && input.value.length < input.minLength) {
          // console.log("MIN_LENGTH_INNER");
          error = `${input.displayName} must have atleast ${input.minLength} characters`;
        }
      }

      if (validation === VALIDATORS.MAX_LENGTH) {
        // console.log("MAX_LENGTH");
        if (input.maxLength && input.value.length > input.maxLength) {
          // console.log("MAX_LENGTH_INNER");
          error = `${input.displayName} must not have more than ${input.maxLength} characters`;
        }
      }
    }
  }

  return error;
};

export const validateForm = (formState) => {
  let isValid = true
  for (const key in formState.inputs) {
   if(formState.inputs[key].error) {
      isValid = false
      break;
   }
  }
  return isValid
}