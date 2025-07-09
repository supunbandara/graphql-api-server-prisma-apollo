import jwt from 'jsonwebtoken';
import { logger } from './logging.js';

const ISSUER = 'example.io';
const EXPIRES_IN = '1h';
const ALGORITHM = 'HS256';
const TOKEN_REFRESH_THRESHOLD = 15 * 60; // 15 minutes

const JWT_OPTIONS = {
  issuer: ISSUER,
  expiresIn: EXPIRES_IN,
  algorithm: ALGORITHM,
};

/**
 * Signs a payload into a JWT token.
 * @param {Object} payload - Payload to encode.
 * @returns {string} JWT token.
 */
export function sign(payload) {
  return jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, JWT_OPTIONS);
}

/**
 * Verifies the JWT from Authorization header and refreshes if needed.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Object|undefined} - Decoded payload or undefined if invalid.
 */
export function verify(req, res) {
  try {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme.toLowerCase() !== 'bearer' || !token) {
      return undefined;
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { issuer: ISSUER });

    // Check if token is older than refresh threshold
    const issuedAt = decoded.iat;
    const now = Math.floor(Date.now() / 1000);

    if (issuedAt && (now - issuedAt) >= TOKEN_REFRESH_THRESHOLD) {
      const refreshedToken = sign(decoded.payload);
      res.setHeader('Authorization', `Bearer ${refreshedToken}`);
    }

    return decoded.payload;
  } catch (err) {
    if (err.name !== 'TokenExpiredError') {
      logger.error('JWT verification failed', err);
    }
    return undefined;
  }
}
