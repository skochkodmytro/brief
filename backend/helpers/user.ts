import jwt from 'jsonwebtoken';

const pk = 'dahHdascbbxhHHDhacbbahhHDhashdbcbabBHJCBbCHBCjbjHBHJCDB';

export const jwtSign = (user: any) => {
    return jwt.sign(user.toJSON(), pk, { expiresIn: 60 * 60 * 24 * 365 * 30 });
}

export const decodeToken = (token: string) => {
    try {
        return jwt.verify(token, pk);
    } catch (e: any) {
        return null;
    }
}
