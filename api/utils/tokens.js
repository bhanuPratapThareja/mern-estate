import jwt from 'jsonwebtoken'

export const issueAccessToken = user => {
    const token = jwt.sign({ 
        id: user.id
    }, 
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: '2m'})
    return token
}

export const issueRefreshToken = user => {
    const token = jwt.sign({ 
        id: user.id, 
        email: user.email 
    }, 
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: '1d'})
    return token
}

export const verifyAccessToken = accessToken => {
    return new Promise((resolve, reject) => {
        if(!accessToken) {
            return reject('NO_ACCESS_TOKEN')
        }
        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                return reject('ACCESS_TOKEN_EXPIRED')
            }
            resolve(user)
        })
    })
}

export const verifyRefreshToken = refreshToken => {
    return new Promise((resolve, reject) => {
        if(!refreshToken) {
            console.log('no refreshToken: ')
            return reject('NO_REFESH_TOKEN')
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
            console.log('refreshToken err: ', err)
            console.log('refreshToken user: ', user)
            if(err) {
                return reject('REFESH_TOKEN_EXPIRED')
            }
            resolve(user)
        })
    })
}