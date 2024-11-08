export const singupValidationSchema = {
    username: {
        trim: true,
        notEmpty: {
            errorMessage: 'User Name cannot be empty'
        },
        isLength: {
            options: {
                min: 4, max: 20
            },
            errorMessage: 'User Name must be 4 to 20 characters long.'
        }
    },
    email: {
        trim: true,
        isEmail: {
            errorMessage: 'Provide a valid Email Id'
        }
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: 'Password cannot be empty'
        },
        isLength: {
            options: {
                min: 8, max: 16
            },
            errorMessage: 'Password must be 8 to 16 characters long'
        },
        isAlphanumeric: {
            errorMessage: 'Password must be alphanumeric'
        }
    }
}

export const signinValidationchema = {
    email: {
        trim: true,
        notEmpty: {
            errorMessage: 'Email id must be provided'
        },
        normalizeEmail: true,
        isEmail: {
            errorMessage: 'Email id must be valid'
        }
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: 'Password must be provided'
        }
    }
}