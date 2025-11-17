import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  email: string;
  tenantId: string; // ← NOVO!
}

export interface AuthRequest extends Request {
  userId?: string;
  tenantId?: string; // ← NOVO!
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.userId = decoded.userId;
    req.tenantId = decoded.tenantId; // ← NOVO!

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
