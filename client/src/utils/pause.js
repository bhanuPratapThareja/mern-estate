export const pauseFn = duration => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}