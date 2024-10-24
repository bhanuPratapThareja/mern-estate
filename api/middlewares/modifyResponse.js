export const cleanResponse = async (req, res, next) => {
    await next()
}