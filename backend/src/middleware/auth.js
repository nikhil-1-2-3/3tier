import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';

export async function authenticate(req, res, next) {
  try {
    let token = req.cookies?.token;

    // Optional fallback to Authorization header if cookie is missing
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please sign in to access this resource.',
      });
    }

    const secret = process.env.JWT_SECRET || 'logicwind_default_secret_key_change_in_prod';
    const decoded = jwt.verify(token, secret);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User session has expired or account not found.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please sign in again.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication credentials.',
    });
  }
}

/**
 * Ensures authenticated user has ADMIN privileges
 */
export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Administrative privileges required.',
    });
  }
  next();
}

/**
 * Optional authentication middleware for endpoints that can be accessed
 * either as a guest or an authenticated user (e.g., booking creation)
 */
export async function optionalAuthenticate(req, res, next) {
  try {
    let token = req.cookies?.token;
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const secret = process.env.JWT_SECRET || 'logicwind_default_secret_key_change_in_prod';
      const decoded = jwt.verify(token, secret);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
        },
      });
      if (user) {
        req.user = user;
      }
    }
  } catch (err) {
    // Continue as guest
  }
  next();
}
