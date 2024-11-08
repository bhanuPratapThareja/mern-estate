export const errorHandler = (status, message) => {
    const error = new Error(message)
    error.status = status
    return error
}

export const getError = errors => {
   const error = errors.array()[0]
   return error
}