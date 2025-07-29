import { Request, Response, NextFunction } from 'express';

export function isSuperAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== 'superadmin') {
    return res.status(403).json({ error: 'Forbidden: SuperAdmin access only' });
  }
  next();
} 