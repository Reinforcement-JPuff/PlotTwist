import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import 'dotenv/config';

export interface User {
    id: number;
    username: string;
}

// generates random secret key for signing JWTs
const generateSecretKey = (): string => {
    return crypto.randomBytes(32).toString('hex');
};

// assign secret key for JWT from from environment variables or make one (see cryptoService)
const secretKey = process.env.JWT_SECRET_KEY || generateSecretKey();

// generate a JWT token
const generateJwtToken = (user: User): string => {
    const payload = {
    id: user.id,
    username: user.username,
    };

    const options: jwt.SignOptions = { expiresIn: '1h' };

  // generate and sign the JWT with the payload and secret key
    const token = jwt.sign(payload, secretKey, options);

    return token;
}

// function to verify JWT token
const verifyJwtToken = (token: string): { id: number; username: string } => {
    try {
        // Decoding the payload to verify a valid token
        const decoded = jwt.verify(token, secretKey) as { id: number; username: string };
        return decoded;
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};

export default { generateJwtToken, verifyJwtToken };
